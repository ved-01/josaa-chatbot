from flask import Flask, render_template, request
from llama_index import VectorStoreIndex, SimpleDirectoryReader

app = Flask(__name__)

# Load documents and create the index
documents = SimpleDirectoryReader(r'D:\NLP\practice\data').load_data()
index = VectorStoreIndex.from_documents(documents)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']

    # Query the index with the user input
    query_engine = index.as_query_engine()
    response = query_engine.query(user_input)

    # Convert the response to a string
    bot_response = str(response)

    return bot_response

if __name__ == '__main__':
    app.run(debug=True)
