# 2014. Longest Subsequence Repeated k Times

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

Find the longest subsequence of `s` that can be repeated `k` times and still be a subsequence of `s`.

---

## 2. Approach: BFS on Candidates — O(26^(n/k)) ✅

```text
// Only characters appearing ≥ k times can be in the answer
// BFS/DFS on candidate subsequences (length‑first)
// For each candidate, check if candidate * k is a subsequence of s
// Return the lexicographically largest longest candidate
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "ababa", k = 2` | `"aba"` | "aba" repeated twice is "abaaba", which is a subsequence of "ababa".
| `s = "abc", k = 2` | `""` | No subsequence can be repeated twice.

---

## 4. Walkthrough

Consider `s = "ababa"`, `k = 2`.

1. Count character frequencies: `a:3, b:2` (both ≥ k).
2. Start BFS with empty string.
3. Append `'a'` → candidate `"a"`. Check `"aa"` is subsequence of `s`? Yes.
4. Append `'b'` → candidate `"b"`. Check `"bb"`? No, discard.
5. Extend `"a"` with `'b'` → `"ab"`. Check `"abab"`? Yes.
6. Extend `"ab"` with `'a'` → `"aba"`. Check `"abaaba"`? Yes (positions 0,2,4, then 0,2,4).
7. No longer candidates pass the check, so `"aba"` is longest.

---

## 5. Complexity Analysis

- **Time:** BFS explores candidates; worst‑case `O(26^(n/k) · n)`, but pruning by frequency makes it fast in practice.
- **Space:** Stores queue of candidates, up to `O(26^(n/k))` strings.

---

## 6. Follow‑Up Questions

1. How would you modify the algorithm if `k` could be up to `10`?
2. Can you design a DP solution that avoids explicit BFS?
3. What if the alphabet size is large (e.g., Unicode characters)?

---

## 7. Key Takeaway

> Restrict candidates to characters appearing at least `k` times and use BFS/DFS to build the longest repeatable subsequence, checking each candidate by verifying `candidate * k` is a subsequence of `s`.
