# 2947. Count Beautiful Substrings I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-beautiful-substrings-i](https://leetcode.com/problems/count-beautiful-substrings-i)
**Companies:** Amazon

---

## 1. Problem Description

Given a string `s` and integer `k`, count substrings where the number of vowels equals the number of consonants AND `(vowels × consonants) % k == 0`.

---

## 2. Key Insight

> If vowels = consonants = `v`, then the substring has length `2v` and the condition is `v² % k == 0`. Enumerate all substrings of even length, count vowels, and check both conditions.

---

## 3. Approach: Brute Force with Prefix Sums — O(n²) ✅

```text
FUNCTION beautifulSubstrings(s, k):
    n ← LENGTH(s)
    vowelsSet ← {"a","e","i","o","u"}
    prefixVowels ← ARRAY[0..n] INITIALIZED TO 0
    FOR i FROM 0 TO n-1:
        prefixVowels[i+1] ← prefixVowels[i] + (1 IF s[i] IN vowelsSet ELSE 0)
    count ← 0
    FOR i FROM 0 TO n-1:
        FOR j FROM i+1 TO n:
            v ← prefixVowels[j] - prefixVowels[i]
            c ← (j - i) - v
            IF v == c AND (v * c) % k == 0:
                count ← count + 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) | O(n) |

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "aeiou"`, `k = 1` | `0` | No substring has equal vowels and consonants.
| `s = "abec"`, `k = 2` | `1` | Substring `"abec"` has 2 vowels (`a,e`) and 2 consonants (`b,c`); `2*2 % 2 = 0`.
| `s = "aabb"`, `k = 4` | `2` | Substrings `"aabb"` and `"ab"` satisfy the conditions.

---

## 5. Walkthrough

Consider `s = "aabb"`, `k = 4`.

1. Build `prefixVowels = [0,1,2,2,2]`.
2. Enumerate all `(i, j)` pairs:
   - `(0,2)`: substring `"aa"` → v=2, c=0 → not equal.
   - `(0,4)`: substring `"aabb"` → v=2, c=2, `2*2 % 4 = 0` → count++.
   - `(1,3)`: substring `"ab"` → v=1, c=1, `1*1 % 4 = 1` → not counted.
   - `(2,4)`: substring `"bb"` → v=0, c=2 → not equal.
   - `(1,4)`: substring `"abb"` → v=1, c=2 → not equal.
   - `(0,3)`: substring `"aab"` → v=2, c=1 → not equal.
   - `(2,3)`: substring `"b"` → v=0, c=1 → not equal.
3. Only `"aabb"` meets both criteria, resulting in count = 1.

---

## 6. Complexity Analysis

- **Time:** O(n²) – two nested loops over all substring boundaries.
- **Space:** O(n) – prefix array for vowel counts.

---

## 7. Follow-Up Questions

1. How would you improve the solution to O(n) using a hash map of prefix differences?
2. Can the problem be extended to handle uppercase letters and other vowel definitions?
3. What changes are needed if the condition becomes `(vowels + consonants) % k == 0`?

---

## Key Takeaway

> For small n, enumerate all substrings with prefix sums for vowel counts. The condition `v == c` means length must be even and exactly half vowels.
