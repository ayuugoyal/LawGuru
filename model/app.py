from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langchain_community.llms import HuggingFacePipeline
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.chains import RetrievalQA
import torch
import

app = Flask(__name__)

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

@app.route('/api/answer_question', methods=['POST'])
def answer_question():
    data = request.get_json()
    question = data['question']

    
    output = qa_chain(question)

    return jsonify({"answer": output})

if __name__ == '__main__':
    app.run(debug=True)

