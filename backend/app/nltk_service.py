import nltk
from nltk import word_tokenize, pos_tag, ne_chunk

# Download necessary NLTK data (you only need to do this once)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
nltk.download('punkt_tab')  # Add this line
nltk.download('averaged_perceptron_tagger_eng')
nltk.download('maxent_ne_chunker_tab')
def perform_ner(text):
    # Tokenize the text
    tokens = word_tokenize(text)
    
    # Perform part-of-speech tagging
    pos_tags = pos_tag(tokens)
    
    # Perform named entity recognition
    named_entities = ne_chunk(pos_tags)
    
    # Extract named entities
    entities = []
    for chunk in named_entities:
        if hasattr(chunk, 'label'):
            entity = ' '.join(c[0] for c in chunk)
            label = chunk.label()
            entities.append((entity, label))
    
    return entities



def extract_subject_candidates(text):
    # Tokenize and perform POS tagging
    tokens = word_tokenize(text)
    pos_tags = pos_tag(tokens)
    
    # Perform Named Entity Recognition
    ne_tree = ne_chunk(pos_tags)
    
    # Extract named entities
    named_entities = []
    for chunk in ne_tree:
        if hasattr(chunk, 'label'):
            entity = ' '.join(c[0] for c in chunk)
            named_entities.append(entity)
    
    # Extract noun phrases (potential subjects)
    noun_phrases = []
    grammar = "NP: {<DT>?<JJ>*<NN>}"
    cp = nltk.RegexpParser(grammar)
    result = cp.parse(pos_tags)
    for subtree in result.subtrees():
        if subtree.label() == 'NP':
            noun_phrases.append(' '.join(word for word, tag in subtree.leaves()))
    
    return {
        "named_entities": named_entities,
        "noun_phrases": noun_phrases,
        "nouns": [word for word, pos in pos_tags if pos.startswith('NN')]
    }



# # Example usage
# text = "Ukraine’s foreign minister, Dmytro Kuleba, has submitted a letter of resignation, according to the parliamentary speaker, Ruslan Stefanchuk. Stefanchuk said the resignation request would be discussed by lawmakers. The reported move on Wednesday comes amid a wider reshuffle of Volodymyr Zelenskiy’s cabinet in which several ministers have resigned, and a presidential aide dismissed. There have been rumours of an imminent government shake-up for months."
# entities = perform_ner(text)

# for entity, label in entities:
#     print(f"Entity: {entity}, Label: {label}")


# # Example usage
# subjects = extract_subject_candidates(text)

# print("Potential subjects:")
# print("Named Entities:", subjects["named_entities"])
# print("Noun Phrases:", subjects["noun_phrases"])
# print("Nouns:", subjects["nouns"])