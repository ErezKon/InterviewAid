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

```
FUNCTION beautifulSubstrings(s, k):
    n = len(s)
    vowels = "aeiou"
    prefix = [0] * (n + 1)
    FOR i FROM 0 TO n-1:
        prefix[i+1] = prefix[i] + (1 IF s[i] IN vowels ELSE 0)
    
    count = 0
    FOR i FROM 0 TO n-1:
        FOR j FROM i+1 TO n:
            v = prefix[j] - prefix[i]
            c = (j - i) - v
            IF v == c AND (v * c) % k == 0:
                count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) | O(n) |

---

## Key Takeaway

> For small n, enumerate all substrings with prefix sums for vowel counts. The condition `v == c` means length must be even and exactly half vowels.
