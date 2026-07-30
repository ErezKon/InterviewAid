# 1044. Longest Duplicate Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-duplicate-substring](https://leetcode.com/problems/longest-duplicate-substring)
**Companies:** Amazon, Bloomberg, Coupang, Goldman Sachs, Google, Meta, Tiktok

---

## 1. Problem Description

Given a string `s`, find the longest substring that appears at least twice (the occurrences may overlap). Return the substring; if none exists, return an empty string.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"banana"` | `"ana"` | "ana" appears at positions 1‑3 and 3‑5. |
| `"abcd"` | `""` | No repeated substring.

## 3. Approach: Binary Search + Rabin‑Karp — O(n log n) ✅

```text
FUNCTION longestDupSubstring(s):
    lo ← 1
    hi ← LENGTH(s) - 1
    result ← ""
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        dup ← findDuplicate(s, mid)
        IF dup != "":
            result ← dup
            lo ← mid + 1
        ELSE:
            hi ← mid - 1
    RETURN result

FUNCTION findDuplicate(s, length):
    base ← 256
    mod ← 2^61 - 1   // large prime
    hash ← compute initial hash of first `length` chars
    seen ← MAP from hash to list of start indices
    seen[hash] ← [0]
    power ← base^(length-1) mod mod
    FOR i ← 1 TO LENGTH(s) - length:
        // slide window: remove s[i-1], add s[i+length-1]
        hash ← (hash - s[i-1]*power) * base + s[i+length-1]
        hash ← hash mod mod
        IF hash IN seen:
            FOR start IN seen[hash]:
                IF s[start:start+length] == s[i:i+length]:
                    RETURN s[i:i+length]
        seen[hash].APPEND(i)
    RETURN ""
```

## 4. Walkthrough

For `"banana"` and length `3`:
1. Compute hash for "ban", store.
2. Slide to "ana" – new hash not seen, store.
3. Slide to "nan" – new hash, store.
4. Slide to "ana" – hash matches previous "ana"; verify strings equal → duplicate found.
5. Binary search expands length to 4, fails, so longest duplicate is "ana".

## 5. Complexity Analysis

- **Time:** O(n log n) – binary search over lengths, each check O(n).
- **Space:** O(n) – hash set/map of seen substrings.

## 6. Follow-Up Questions

- How would you adapt the solution to return all longest duplicate substrings?
- Can you achieve O(n) time using suffix arrays or suffix automaton?
- What changes are needed for Unicode strings with large alphabets?

## 7. Key Takeaway

> Binary search on the answer length combined with a rolling hash lets you test duplicate existence in linear time, yielding an overall O(n log n) solution.
