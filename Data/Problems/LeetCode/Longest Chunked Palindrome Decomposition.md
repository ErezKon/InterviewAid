# 1147. Longest Chunked Palindrome Decomposition

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-chunked-palindrome-decomposition](https://leetcode.com/problems/longest-chunked-palindrome-decomposition)
**Companies:** Google

---

## 1. Problem Description

Split a given string into the maximum number of non‑overlapping chunks `k₁, k₂, …, kₘ` such that the sequence of chunks forms a palindrome, i.e., `kᵢ == kₘ₋ᵢ₊₁` for all `i`.

---

## 2. Examples

**Example 1:**
```
Input: text = "ghiabcdefhelloadamhelloabcdefghi"
Output: 7
Explanation: The string can be split into ["ghi", "abc", "def", "hello", "adam", "hello", "def", "abc", "ghi"], which yields 7 matching pairs plus the middle "adam".
```

**Example 2:**
```
Input: text = "merchant"
Output: 1
Explanation: No matching prefix‑suffix chunks exist, so the whole string is one chunk.
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
