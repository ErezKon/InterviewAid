# 2947. Count Beautiful Substrings I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-beautiful-substrings-i](https://leetcode.com/problems/count-beautiful-substrings-i)
**Companies:** Amazon

---

## 1. Problem Description

You are given a string `s` and a positive integer `k`.

Let `vowels` and `consonants` be the number of vowels and consonants in a string.

A string is **beautiful** if:

- `vowels == consonants`.
- `(vowels * consonants) % k == 0`, in other terms the multiplication of `vowels` and `consonants` is divisible by `k`.

Return *the number of **non-empty beautiful substrings** in the given string* `s`.

A **substring** is a contiguous sequence of characters in a string.

**Vowel letters** in English are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

**Consonant letters** in English are every letter except vowels.

**Constraints:**
- `1 <= s.length <= 1000`
- `1 <= k <= 1000`
- `s` consists of only English lowercase letters.

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

```
Example 1:
  Input: s = "baeyh", k = 2
  Output: 2
  Explanation: There are 2 beautiful substrings in the given string.
  - Substring "aeyh", vowels = 2 (["a","e"]), consonants = 2 (["y","h"]).
    You can see that string "aeyh" is beautiful as vowels == consonants and vowels * consonants % k == 0.
  - Substring "baey", vowels = 2 (["a","e"]), consonants = 2 (["b","y"]).
    You can see that string "baey" is beautiful as vowels == consonants and vowels * consonants % k == 0.
  It can be shown that there are only 2 beautiful substrings in the given string.
```

```
Example 2:
  Input: s = "abba", k = 1
  Output: 3
  Explanation: There are 3 beautiful substrings in the given string.
  - Substring "ab", vowels = 1 (["a"]), consonants = 1 (["b"]).
  - Substring "ba", vowels = 1 (["a"]), consonants = 1 (["b"]).
  - Substring "abba", vowels = 2 (["a","a"]), consonants = 2 (["b","b"]).
  It can be shown that there are only 3 beautiful substrings in the given string.
```

```
Example 3:
  Input: s = "bcdf", k = 1
  Output: 0
  Explanation: There are no beautiful substrings in the given string.
```

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
