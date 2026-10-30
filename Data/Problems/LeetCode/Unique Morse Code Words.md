# 804. Unique Morse Code Words

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-morse-code-words](https://leetcode.com/problems/unique-morse-code-words)
**Companies:** Amazon, Wix

---

## Problem Description

International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows:

- `'a'` maps to `".-"`,
- `'b'` maps to `"-..."`,
- `'c'` maps to `"-.-."`, and so on.

For convenience, the full table for the `26` letters of the English alphabet is given below:

```
[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
```

Given an array of strings `words` where each word can be written as a concatenation of the Morse code of each letter.

- For example, `"cab"` can be written as `"-.-..--..."`, which is the concatenation of `"-.-."`, `".-"`, and `"-..."`. We will call such a concatenation the **transformation** of a word.

Return *the number of different **transformations** among all words we have*.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 12`
- `words[i]` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["gin","zen","gig","msg"]
Output: 2
Explanation: The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."
There are 2 different transformations: "--...-." and "--...--.".
```

**Example 2:**
```
Input: words = ["a"]
Output: 1
```

## Approach
Map each character to its Morse code, then for each word build its representation by concatenating the codes. Store each representation in a hash set to automatically keep only unique values.

```text
FUNCTION uniqueMorseCount(words):
    SET morseMap ← { 'a':' .-', 'b':'-...', /* ... all 26 letters ... */ }
    SET uniqueSet ← EMPTY SET
    FOR word IN words:
        SET code ← ''
        FOR ch IN word:
            SET code ← CONCAT(code, morseMap[ch])
        ADD code TO uniqueSet
    RETURN SIZE(uniqueSet)
```

## Walkthrough
| Word | Transformation |
|------|----------------|
| `gin` | `--...-.` |
| `zen` | `--...-.` |
| `gig` | `--...--.` |
| `msg` | `--...--.` |
Unique set = {`--...-.`, `--...--.`} → count 2.

## Complexity Analysis
- **Time:** O(N · L) where N is number of words and L is average word length.
- **Space:** O(N) for the set of unique Morse strings.

## Follow-Up Questions
1. How would you handle a very large list of words that cannot fit into memory?
2. Can the solution be extended to support uppercase letters or custom alphabets?
3. What if you need to return the actual distinct Morse strings instead of just the count?

## Key Takeaway
Convert each word to Morse code and use a hash set to count distinct representations.
