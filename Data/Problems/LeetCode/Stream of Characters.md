# 1032. Stream of Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stream-of-characters](https://leetcode.com/problems/stream-of-characters)
**Companies:** Amazon, Google, Jane Street, Meta

---

## Problem Description
Design a data structure that receives a stream of characters one by one and can query whether any suffix of the current stream matches a word from a given list. The `query` operation returns `true` if such a suffix exists, otherwise `false`.

## Examples
- **Initialize:** `words = ["cd", "f", "kl"]`
- **query('a') → false** – No suffix matches.
- **query('b') → false** – Still no match.
- **query('c') → false** – No match yet.
- **query('d') → true** – Suffix "cd" matches a word.
- **query('f') → true** – Suffix "f" matches.

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
