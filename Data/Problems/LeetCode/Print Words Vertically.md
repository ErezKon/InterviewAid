# 1324. Print Words Vertically

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/print-words-vertically](https://leetcode.com/problems/print-words-vertically)
**Companies:** Guidewire, Microsoft

---

## Problem Description

Given a string `s`. Return all the words vertically in the same order in which they appear in `s`.
Words are returned as a list of strings, complete with spaces when is necessary. (Trailing spaces are not allowed).
Each word would be put on only one column and that in one column there will be only one word.

**Constraints:**
- `1 <= s.length <= 200`
- `s` contains only upper case English letters.
- It's guaranteed that there is only one space between 2 words.

## Examples

**Example 1:**
```
Input: s = "HOW ARE YOU"
Output: ["HAY","ORO","WEU"]
Explanation: Each word is printed vertically.
 "HAY"
 "ORO"
 "WEU"
```

**Example 2:**
```
Input: s = "TO BE OR NOT TO BE"
Output: ["TBONTB","OEROOE","   T"]
Explanation: Trailing spaces is not allowed.
"TBONTB"
"OEROOE"
"   T"
```

**Example 3:**
```
Input: s = "CONTEST IS COMING"
Output: ["CIC","OSO","N M","T I","E N","S G","T"]
```

## Approach
1. **Split** the input string into an array of words.
2. Determine the length of the longest word `maxLen`.
3. For each column index `i` from `0` to `maxLen-1`:
   - Build a string by taking the `i`-th character of each word if it exists, otherwise a space.
   - Trim trailing spaces before adding to the result list.

### Pseudocode
```text
FUNCTION printVertically(s):
    SET words ← SPLIT(s, " ")
    SET maxLen ← MAXIMUM(LENGTH(w) FOR w IN words)
    SET result ← []
    FOR i ← 0 TO maxLen - 1:
        SET column ← ""
        FOR w IN words:
            IF i < LENGTH(w):
                SET column ← column + w[i]
            ELSE:
                SET column ← column + " "
        END FOR
        SET column ← TRIM_TRAILING_SPACES(column)
        APPEND column TO result
    END FOR
    RETURN result
```
The outer loop iterates over columns, the inner loop over words.

## Walkthrough
For `"HOW ARE YOU"`:
| i | column before trim | after trim |
|---|-------------------|------------|
|0|`H`+`A`+`Y`=`HAY`|`HAY`|
|1|`O`+`R`+` `=`OR `|`OR ` (trailing space kept because column 2 has a character)|
|2|`W`+`E`+`U`=`WEU`|`WEU`|
The final list matches the example.

## Complexity Analysis
- **Time:** `O(N * L)` where `N` is the number of words and `L` is the length of the longest word (each character is visited once).
- **Space:** `O(N * L)` for the output list plus `O(N)` for the split words.

## Follow-Up Questions
1. How would you modify the solution to handle multiple spaces between words?
2. Can you output the result without building the full intermediate matrix?
3. How would you adapt the algorithm for Unicode characters with variable byte length?

## Key Takeaway
Treat the problem as column-wise traversal of a word matrix, padding shorter words with spaces and trimming trailing blanks.
