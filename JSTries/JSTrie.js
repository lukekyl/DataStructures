// JS Trie Implementation taken from these sources:
// https://kevinwin.com/blog/How-to-implement-a-Trie-in-JavaScript/
// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
// https://leetcode.com/problems/implement-trie-prefix-tree/solution/


function TrieNode(letter = '') {
    this.value = letter;
    this.parent = null;
    this.children = {};
    this.wordcount = 0;
    this.end = false;
}


TrieNode.prototype.getWord = function() {
    let output = [];
    let node = this;

    while (node !== null) {
        output.unshift(node.value);
        node = node.parent;
    }

    return output.join('')
}

function Trie() {
    this.root = new TrieNode(null);
}

Trie.prototype.insert = function(word){
    let node = this.root;
    ++node.wordcount;
    let wordcount = node.wordcount;

    for (const letter of word) {
        if (node.children[letter]) {
            node = node.children[letter];
        } else {
            const newNode = new TrieNode(letter);
            node.children[letter] = newNode;
            node.children[letter].wordcount = wordcount;
            node.children[letter].end = false;
            node.children[letter].parent = node;
            node = node.children[letter]
            console.log(letter)
        }

        if (letter === word[word.length-1]) {
            node.end = true;
        }
    }
};

Trie.prototype.startsWith = function(prefix) {
    var currNode = this.root;
    var letter = prefix.slice(0,1);
    prefix = prefix.slice(1);    

    while(letter.length > 0 ){
        if(currNode.children[letter]){
			currNode = currNode.children[letter];			           			
            letter = prefix.slice(0,1);
            prefix = prefix.slice(1);			           
        }else{
            return false;
        }        
    }    
    return true;
};

Trie.prototype.find = function(word){
    let node = this.root;
    let value = ''
    console.log('Finding '+ word)
    for(const letter in word) {
        if (node.children[word[letter]]) {
            console.log(word[letter])
            node = node.children[word[letter]]
            value += word[letter]
        } else {
            console.log('Not Found')
            return false
        }
    }
    console.log(value)
    return value === word ? true : false;
}

Trie.prototype.findWords = function(prefix) {
    let node = this.root;
    let output = [];
    console.log('Finding Words with ' + prefix)

    for (const letter in prefix) {
        console.log(prefix[letter])
        if (node.children[prefix[letter]]) {
            node = node.children[prefix[letter]]
        } else {
            console.log('No Words')
            return output;
        }
    }
    function findOutput(node, output) {
        // console.log('Finding output.')
        if (node.end) {
            console.log('Words found:')
            return output.unshift(node.getWord());
        }

        for (let child in node.children) {
            findOutput(node.children[child], output)
        }
    }
    findOutput(node, output)
    return output
}



const trie = new Trie();
trie.insert('HELL');
trie.insert('HELLO');
trie.insert('HERO');

console.log(trie.find('HELLO'));
console.log(trie.find('HELP'));
console.log(trie.findWords('HE'));
console.log(trie.findWords('HEL'));

