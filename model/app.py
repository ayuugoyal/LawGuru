from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from langchain_community.vectorstores import Chroma
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langchain_community.llms import HuggingFacePipeline
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.chains import RetrievalQA
import torch

app = FastAPI()

embeddings = SentenceTransformerEmbeddings(model_name="multi-qa-mpnet-base-dot-v1")
persist_directory = "chroma"
db = Chroma(persist_directory, embeddings)

checkpoint = "MBZUAI/LaMini-Flan-T5-783M"

tokenizer = AutoTokenizer.from_pretrained(checkpoint)
base_model = AutoModelForSeq2SeqLM.from_pretrained(
    checkpoint,
    device_map="auto",
    torch_dtype=torch.float32
)

pipe = pipeline(
    'text2text-generation',
    model=base_model,
    tokenizer=tokenizer,
    max_length=512,
    do_sample=True,
    temperature=0.3,
    top_p=0.95
)

local_llm = HuggingFacePipeline(pipeline=pipe)

qa_chain = RetrievalQA.from_chain_type(
    llm=local_llm,
    chain_type='stuff',
    retriever=db.as_retriever(search_type="similarity", search_kwargs={"k": 2}),
    return_source_documents=True,
)

@app.get("/")
def index():
    return {"message": "working"}

@app.post("/api/answer_question")
async def answer_question(request: Request):
    data = await request.json()
    question = data['question']

    
    output = qa_chain(question)

    response_content = {"answer": output}
    return JSONResponse(content=jsonable_encoder(response_content))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

