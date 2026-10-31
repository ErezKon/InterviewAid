# 748. Shortest Completing Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-completing-word](https://leetcode.com/problems/shortest-completing-word)
**Companies:** Google

---

## Problem Description

Given a string `licensePlate` and an array of strings `words`, find the **shortest completing** word in `words`.

A **completing** word is a word that **contains all the letters** in `licensePlate`. **Ignore numbers and spaces** in `licensePlate`, and treat letters as **case insensitive**. If a letter appears more than once in `licensePlate`, then it must appear in the word the same number of times or more.

For example, if `licensePlate = "aBc 12c"`, then it contains letters `'a'`, `'b'` (ignoring case), and `'c'` twice. Possible **completing** words are `"abccdef"`, `"caaacab"`, and `"cbca"`.

Return *the shortest **completing** word in* `words`*.* It is guaranteed an answer exists. If there are multiple shortest **completing** words, return the **first** one that occurs in `words`.

**Constraints:**

- `1 <= licensePlate.length <= 7`
- `licensePlate` contains digits, letters (uppercase or lowercase), or space `' '`.
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 15`
- `words[i]` consists of lower case English letters.

---

## Approach

```text
FUNCTION shortestCompletingWord(licensePlate, words):
    // Build frequency map of required letters
    target ← MAP()
    FOR ch IN licensePlate:
        IF ch IS LETTER:
            lower ← LOWERCASE(ch)
            target[lower] ← target.GET(lower, 0) + 1

    best ← NULL
    FOR word IN words:
        // Build frequency map for current word
        wCount ← MAP()
        FOR ch IN word:
            lower ← LOWERCASE(ch)
            wCount[lower] ← wCount.GET(lower, 0) + 1
        // Check if word satisfies all required letters
        satisfies ← TRUE
        FOR (c, cnt) IN target:
            IF wCount.GET(c, 0) < cnt:
                satisfies ← FALSE
                BREAK
        IF satisfies:
            IF best IS NULL OR LEN(word) < LEN(best):
                best ← word
    RETURN best
```

## Examples

```
Example 1:
  Input: licensePlate = "1s3 PSt", words = ["step","steps","stripe","stepple"]
  Output: "steps"
  Explanation: licensePlate contains letters 's', 'p', 's' (ignoring case), and 't'.
  "step" contains 't' and 'p', but only contains 1 's'.
  "steps" contains 't', 'p', and both 's' characters.
  "stripe" is missing an 's'.
  "stepple" is missing an 's'.
  Since "steps" is the only word containing all the letters, that is the answer.
```

```
Example 2:
  Input: licensePlate = "1s3 456", words = ["looks","pest","stew","show"]
  Output: "pest"
  Explanation: licensePlate only contains the letter 's'. All the words contain 's', but among these "pest", "stew", and "show" are shortest.
  The answer is "pest" because it is the word that appears earliest of the 3.
```

## Walkthrough

1. Convert the license plate "1s3 PSt" to a frequency map: `{s:2, p:1, t:1}`.
2. Iterate over each candidate word:
   - "step": counts `{s:1, t:1, e:1, p:1}` → missing one `s` → not valid.
   - "steps": counts `{s:2, t:1, e:1, p:1}` → satisfies all requirements.
   - Remaining words are longer, so "steps" remains the best.
3. Return "steps".

## Complexity Analysis

- **Time:** O(L + W × K) where *L* is length of the license plate, *W* is number of words, and *K* is average word length (building frequency maps).
- **Space:** O(26) for the two frequency maps (constant space).

## Follow-Up Questions

1. How would you adapt the solution if the list of words were streamed and could not be stored entirely in memory?
2. Can the algorithm be optimized using a pre-processed index of words by their letter frequencies?
3. What changes are needed if the license plate may contain Unicode letters beyond the basic Latin alphabet?

## Key Takeaway

Build a frequency map of required letters from the license plate and compare it against each word’s letter counts; the shortest word that meets or exceeds all required frequencies is the answer.
