class Entry :
    def __init__(self, input_word, input_synonyms) :
        self.word = input_word
        self.synonyms = input_synonyms
e1 = Entry("dog", ["doggie", "puppy"])
e2 = Entry("cat", ["kitty"])
Thesaurus = [e1, e2] 

doc1 = ["this", "is", "a", "puppy", "here"]
doc2 = ["here", "is", "another", "doggie"]
Corpus = [doc1, doc2] 

def search (keyword):
    syn = []
    for i in Thesaurus:
        if i.word == keyword:
            syn = i.synonyms
    syn.insert(0, keyword)
    r = []
    for word in syn:
        ctr = 0
        for i in Corpus:
            for j in i:
                if j == word:
                    ctr+=1
        r.append( (word, ctr))
    return r
input ="dog"
output = search (input) 
print(output) 