# 1737. Change Minimum Characters to Satisfy One of Three Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions](https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions)
**Companies:** Google

---

## 1. Problem Description

Given strings `a` and `b`, find the minimum operations (change any character) to satisfy one of: (1) every char in `a` < every char in `b`, (2) every char in `b` < every char in `a`, (3) both consist of only one distinct character.

---

## 2. Key Insight

> For conditions 1 & 2: try each split character `c` ('b'-'z'). Cost = chars in `a` ≥ c + chars in `b` < c (for condition 1). Use prefix frequency counts.
> For condition 3: try each letter, cost = total chars not equal to that letter.

---

## 3. Approach: Frequency Counting — O(n + m) ✅

```
FUNCTION minCharacters(a, b):
    freqA = [0]*26; freqB = [0]*26
    FOR ch IN a: freqA[ord(ch)-ord('a')] += 1
    FOR ch IN b: freqB[ord(ch)-ord('a')] += 1
    
    ans = INF
    prefA = prefB = 0
    FOR c ← 0 TO 24:    // split between c and c+1
        prefA += freqA[c]; prefB += freqB[c]
        // Condition 1: all a < all b → a chars must be ≤ c, b chars must be > c
        ans = MIN(ans, (len(a) - prefA) + prefB)
        // Condition 2: all b < all a
        ans = MIN(ans, prefA + (len(b) - prefB))
    // Condition 3: make all same char
    FOR c ← 0 TO 25:
        ans = MIN(ans, (len(a) - freqA[c]) + (len(b) - freqB[c]))
    RETURN ans
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) |

---

## Key Takeaway

> Enumerate all 26 possible split points for conditions 1&2 and all 26 target characters for condition 3. Prefix sums over character frequencies make each check O(1).
