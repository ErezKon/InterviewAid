# 2539. Count the Number of Good Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-subsequences](https://leetcode.com/problems/count-the-number-of-good-subsequences)
**Companies:** Nvidia, Palantir, Tusimple, Ukg

---

## Problem Description

A **subsequence** of a string is good if it is not empty and the frequency of each one of its characters is the same.

Given a string `s`, return *the number of good subsequences of* `s`. Since the answer may be too large, return it modulo `10^9 + 7`.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "aabb"
  Output: 11
  Explanation: The total number of subsequences is 2^4. There are five subsequences which are not good:
  "aab" (indices {0,1,2}), "aab" (indices {0,1,3}), "abb" (indices {0,2,3}), "abb" (indices {1,2,3}), and the empty subsequence.
  Hence, the number of good subsequences is 2^4 - 5 = 11.
```

```
Example 2:
  Input: s = "leet"
  Output: 12
  Explanation: There are four subsequences which are not good: "lee", "eet", "leet" (with 'e' appearing twice alongside a single other letter), and the empty subsequence.
  Hence, the number of good subsequences is 2^4 - 4 = 12.
```

```
Example 3:
  Input: s = "abcd"
  Output: 15
  Explanation: All of the non-empty subsequences are good subsequences. Hence, the number of good subsequences is 2^4 - 1 = 15.
```

---

## Key Insight

Fix the target frequency `f` (1 to max character count). For each character `c` with count `cnt[c] ≥ f`, you can either skip it or choose `f` of its occurrences: `C(cnt[c], f) + 1` options (the +1 is for skipping). Multiply across all characters, subtract 1 (for the all‑skip case). Sum over all valid `f`.

---

## Approach

```text
FUNCTION countGoodSubsequences(s):
    MOD ← 1_000_000_007
    cnt ← MAP()                     // frequency of each character
    FOR ch IN s:
        cnt[ch] ← cnt.GET(ch, 0) + 1
    maxCount ← MAXIMUM VALUE IN cnt
    result ← 0

    FOR f ← 1 TO maxCount DO:
        ways ← 1
        FOR each character c IN cnt DO:
            IF cnt[c] ≥ f THEN
                // Choose f occurrences of c or skip c entirely
                ways ← ways * (COMB(cnt[c], f) + 1) MOD MOD
            // If cnt[c] < f, only the skip option (×1) exists
        ways ← ways - 1               // remove the all‑skip combination
        result ← (result + ways) MOD MOD

    RETURN result
```

---

## Walkthrough

**Using Example 3 (`s = "aab"`):**
| f | cnt[a] | cnt[b] | Options for a (`C(2,f)+1`) | Options for b (`C(1,f)+1`) | ways (product) | ways‑1 (exclude empty) |
|---|--------|--------|---------------------------|---------------------------|----------------|-----------------------|
| 1 | 2 | 1 | C(2,1)+1 = 3 | C(1,1)+1 = 2 | 3 × 2 = 6 | 5 |
| 2 | 2 | 1 | C(2,2)+1 = 2 | cnt[b] < 2 → 1 | 2 × 1 = 2 | 1 |
| maxCount = 2, stop |

Sum of `ways‑1` over all `f` = 5 + 1 = 6. Adding the subsequence consisting of a single `b` counted in `f=1` gives total 5 good non‑empty subsequences, matching the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(maxCount × |Σ|) where |Σ| ≤ 26 (alphabet size) — pre‑computing combinations makes each iteration constant time |
| **Space** | O(|Σ|) for the frequency map and factorial tables |

---

## Follow‑Up Questions

- How would the algorithm change if the alphabet were Unicode (large |Σ|)?
- Can we adapt the method to count subsequences where frequencies differ by at most one?
- What is the impact on runtime if we need to output the actual subsequences instead of just the count?

---

## Key Takeaway

> **Good subsequences with uniform character frequency are counted by fixing a target frequency `f`, independently deciding for each character whether to include exactly `f` copies or skip it, multiplying the choices, subtracting the empty case, and summing over all possible `f`.**