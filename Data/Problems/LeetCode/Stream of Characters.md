# 1032. Stream of Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stream-of-characters](https://leetcode.com/problems/stream-of-characters)
**Companies:** Amazon, Google, Jane Street, Meta

---

## Problem Description

Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings `words`.

For example, if `words = ["abc", "xyz"]` and the stream added the four characters (one by one) `'a'`, `'x'`, `'y'`, and `'z'`, your algorithm should detect that the suffix `"xyz"` of the characters `"axyz"` matches `"xyz"` from `words`.

Implement the `StreamChecker` class:

- `StreamChecker(String[] words)` Initializes the object with the strings array `words`.
- `boolean query(char letter)` Accepts a new character from the stream and returns `true` if any non-empty suffix from the stream forms a word that is in `words`.

**Constraints:**
- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 200`
- `words[i]` consists of lowercase English letters.
- `letter` is a lowercase English letter.
- At most `4 * 10^4` calls will be made to query.

## Examples

**Example 1:**
```
Input
["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
Output
[null, false, false, false, true, false, true, false, false, false, false, false, true]
Explanation
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query("a"); // return False
streamChecker.query("b"); // return False
streamChecker.query("c"); // return False
streamChecker.query("d"); // return True, because 'cd' is in the wordlist
streamChecker.query("e"); // return False
streamChecker.query("f"); // return True, because 'f' is in the wordlist
streamChecker.query("g"); // return False
streamChecker.query("h"); // return False
streamChecker.query("i"); // return False
streamChecker.query("j"); // return False
streamChecker.query("k"); // return False
streamChecker.query("l"); // return True, because 'kl' is in the wordlist
```

## Approach
**Algorithm:** Reverse Trie (prefix tree) built from reversed words; each query walks the trie from the most recent character backwards.
- **Insight:** A suffix of the stream corresponds to a prefix of the reversed stream. By storing words reversed, we can check suffixes efficiently.

### Pseudocode
```text
CLASS StreamChecker:
    CONSTRUCTOR(words):
        CREATE root node of trie
        FOR each word IN words:
            node ← root
            FOR char IN REVERSE(word):
                IF char NOT IN node.children:
                    node.children[char] ← NEW node
                node ← node.children[char]
            node.isEnd ← true
        self.stream ← empty list
        self.root ← root

    FUNCTION query(letter):
        APPEND letter TO self.stream
        node ← self.root
        // Walk backwards through the stream
        FOR i FROM LENGTH(self.stream)-1 DOWNTO 0:
            c ← self.stream[i]
            IF c NOT IN node.children:
                RETURN false
            node ← node.children[c]
            IF node.isEnd:
                RETURN true
        RETURN false
```

## Walkthrough
Assume `words = ["cd", "f", "kl"]`.
1. Build trie with reversed words: "dc", "f", "lk".
2. Query sequence `a, b, c, d`:
   - After `a`: walk "a" – not in root → false.
   - After `b`: "b" not in root → false.
   - After `c`: "c" not in root → false.
   - After `d`: walk "d" → exists, then "c" → node marked end → true (matches "cd").
3. Query `f`: walk "f" → node marked end → true.

## Complexity Analysis
- **Time per query:** O(L) where L is the maximum word length (bounded by 2000 in constraints).
- **Space:** O(T) for the trie, where T is total characters across all words.

## Follow-Up Questions
- How would you modify the structure to support removal of words?
- Can you achieve O(1) average query time using a rolling hash?
- What changes are needed if queries must also support prefix checks instead of suffixes?

## Key Takeaway
Reversing the words and storing them in a trie turns suffix queries into prefix walks, enabling fast incremental checks on a character stream.
