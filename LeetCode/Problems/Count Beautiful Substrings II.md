# 2949. Count Beautiful Substrings II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-beautiful-substrings-ii](https://leetcode.com/problems/count-beautiful-substrings-ii)
**Companies:** Amazon

---

## 1. Problem Description

Same as Count Beautiful Substrings I but with larger constraints requiring an O(n√k) or better solution.

---

## 2. Key Insight

> Transform: vowel → +1, consonant → -1. `v == c` iff prefix sum difference = 0. The condition `v² % k == 0` means `v % d == 0` where `d` is the smallest integer with `d² % k == 0`. Group by `(prefix_sum, index % d)` — matching groups give valid substrings.

---

## 3. Approach: Hash Map Grouping — O(n × √k) ✅

```
FUNCTION beautifulSubstrings(s, k):
    // Find smallest d such that d*d % k == 0
    d = 1
    WHILE (d * d) % k != 0: d += 1
    period = 2 * d  // vowels = consonants = v, length = 2v, v % d == 0
    
    vowels = "aeiou"
    prefixSum = 0
    count = 0
    seen = defaultdict(int)
    seen[(0, 0)] = 1
    
    FOR i FROM 0 TO len(s)-1:
        prefixSum += 1 IF s[i] IN vowels ELSE -1
        key = (prefixSum, (i + 1) % period)
        count += seen[key]
        seen[key] += 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> The `v² % k == 0` constraint introduces a periodicity. Group prefix states by `(balance, index mod period)` to count valid substrings in O(n).
