# 2949. Count Beautiful Substrings II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-beautiful-substrings-ii](https://leetcode.com/problems/count-beautiful-substrings-ii)
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
- `1 <= s.length <= 5 * 10^4`
- `1 <= k <= 1000`
- `s` consists of only English lowercase letters.

---

## 2. Key Insight

> Transform: vowel → +1, consonant → -1. `v == c` iff prefix sum difference = 0. The condition `v² % k == 0` means `v % d == 0` where `d` is the smallest integer with `d² % k == 0`. Group by `(prefix_sum, index % d)` — matching groups give valid substrings.

---

## 3. Approach: Hash Map Grouping — O(n × √k) ✅

```text
FUNCTION beautifulSubstrings(s, k):
    // Find smallest d such that d*d % k == 0
    d ← 1
    WHILE (d * d) % k != 0:
        d ← d + 1
    period ← 2 * d  // length must be multiple of period
    
    vowelsSet ← {"a","e","i","o","u"}
    prefixSum ← 0
    count ← 0
    seen ← MAP FROM (INT, INT) TO INT INITIALIZED EMPTY
    seen[(0, 0)] ← 1
    
    FOR i FROM 0 TO LENGTH(s)-1:
        prefixSum ← prefixSum + (1 IF s[i] IN vowelsSet ELSE -1)
        key ← (prefixSum, (i + 1) % period)
        count ← count + seen.get(key, 0)
        seen[key] ← seen.get(key, 0) + 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n × √k) | O(n) |

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

1. Compute smallest `d` where `d*d % 4 == 0` → `d = 2`, `period = 4`.
2. Iterate characters, updating `prefixSum` and `key`:
   - i=0 (`a`): `prefixSum=1`, `key=(1,1)`, count+=0, seen[(1,1)]=1.
   - i=1 (`a`): `prefixSum=2`, `key=(2,2)`, count+=0, seen[(2,2)]=1.
   - i=2 (`b`): `prefixSum=1`, `key=(1,3)`, count+=0, seen[(1,3)]=1.
   - i=3 (`b`): `prefixSum=0`, `key=(0,0)`, count+=seen[(0,0)]=1 → count=1, seen[(0,0)]=2.
3. Final count = 1, matching the valid substring `"aabb"`.

---

## 6. Complexity Analysis

- **Time:** O(n × √k) – scanning the string and constant‑time hashmap operations.
- **Space:** O(n) – hashmap storing seen states.

---

## 7. Follow-Up Questions

1. Can the solution be improved to O(n) using number‑theoretic properties of `k`?
2. How would you adapt the algorithm for Unicode characters and extended vowel sets?
3. What if the condition changes to `(vowels + consonants) % k == 0`?

---

## Key Takeaway

> Grouping prefix states by balance and periodic index enables counting valid substrings in near‑linear time despite the modular constraint.
