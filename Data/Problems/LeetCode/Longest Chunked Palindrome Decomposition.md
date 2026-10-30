# 1147. Longest Chunked Palindrome Decomposition

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-chunked-palindrome-decomposition](https://leetcode.com/problems/longest-chunked-palindrome-decomposition)
**Companies:** Google

---

## 1. Problem Description

You are given a string `text`. You should split it to k substrings `(subtext_1, subtext_2, ..., subtext_k)` such that:

- `subtext_i` is a **non-empty** string.
- The concatenation of all the substrings is equal to `text` (i.e., `subtext_1 + subtext_2 + ... + subtext_k == text`).
- `subtext_i == subtext_k - i + 1` for all valid values of `i` (i.e., `1 <= i <= k`).

Return the largest possible value of `k`.

**Constraints:**
- `1 <= text.length <= 1000`
- `text` consists only of lowercase English characters.

---

## 2. Examples

**Example 1:**
```
Input: text = "ghiabcdefhelloadamhelloabcdefghi"
Output: 7
Explanation: We can split the string on "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)".
```

**Example 2:**
```
Input: text = "merchant"
Output: 1
Explanation: We can split the string on "(merchant)".
```

**Example 3:**
```
Input: text = "antaprezatepzapreanta"
Output: 11
Explanation: We can split the string on "(a)(nt)(a)(pre)(za)(tep)(za)(pre)(a)(nt)(a)".
```

---

## 3. Approach: Greedy Two Pointers — O(n) ✅

Use two pointers moving from the start and end of the string, building the current left and right chunks character by character. Whenever the built left and right chunks become equal, we have found a matching pair and can increment the count by two.

```text
FUNCTION longestDecomposition(text):
    SET count ← 0
    SET lo ← 0
    SET hi ← LENGTH(text) - 1
    SET leftChunk ← ""
    SET rightChunk ← ""
    WHILE lo < hi:
        SET leftChunk ← leftChunk + text[lo]
        SET rightChunk ← text[hi] + rightChunk
        IF leftChunk == rightChunk:
            SET count ← count + 2
            SET leftChunk ← ""
            SET rightChunk ← ""
        SET lo ← lo + 1
        SET hi ← hi - 1
    // If there is a remaining middle part, it forms one extra chunk
    IF lo == hi OR leftChunk != "":
        SET count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider `text = "ghiabcdefhelloadamhelloabcdefghi"`.

| Step | lo char | hi char | leftChunk | rightChunk | Action |
|------|---------|---------|-----------|------------|--------|
| 1    | g       | i       | g         | i          | not equal |
| 2    | h       | h       | gh        | hi         | not equal |
| ...  | ...     | ...     | ...       | ...        | ... |
| 10   | a       | a       | ghiabcdef | abcdefghi  | equal → count+=2, reset chunks |
| ...  | continue until middle "adam" remains → count+=1 |

Resulting count = 7.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

The algorithm scans the string once and uses only a few pointers and temporary strings.

---

## 6. Follow‑Up Questions

1. How would the solution change if the chunks must have a minimum length?
2. Can the algorithm be adapted to return the actual chunks, not just the count?
3. What is the complexity if we need to handle Unicode characters with variable byte length?

---

## 7. Key Takeaway

> Greedily match the shortest possible equal prefix and suffix chunks. This maximizes the number of chunks. Rolling hash can replace string comparison for O(n) time.
