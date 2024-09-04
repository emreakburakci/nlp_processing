from transformers import BartTokenizer, BartForConditionalGeneration


def summarize(text):
    # Load pre-trained BART model and tokenizer
    model_name = "facebook/bart-large-cnn"
    tokenizer = BartTokenizer.from_pretrained(model_name)
    model = BartForConditionalGeneration.from_pretrained(model_name)

    # Input text to be summarized
    input_text = text

    # Tokenize and summarize the input text using BART
    inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs, max_length=100, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)

    # Decode and output the summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary
