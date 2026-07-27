# 2953. Count Complete Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-complete-substrings](https://leetcode.com/problems/count-complete-substrings)
**Companies:** Meesho

---

## 1. Problem Description

Given a string `word` and integer `k`, count substrings where each character that appears does so exactly `k` times, and adjacent characters differ by at most 2 in the alphabet.

---

## 2. Key Insight

> The adjacency constraint splits the string into segments where `|s[i] - s[i-1]| <= 2`. Within each segment, the substring length must be `c × k` for some number of distinct characters `c` (1 to 26). Use sliding window of fixed size `c × k` for each `c`.

---

## 3. Approach: Segment + Fixed Window — O(26 × n) ✅

```
FUNCTION countCompleteSubstrings(word, k):
    count = 0
    // Split into segments by adjacency constraint
    segments = split word where |word[i] - word[i-1]| > 2
    
    FOR each segment:
        FOR c FROM 1 TO 26:  // number of distinct chars
            windowSize = c * k
            IF windowSize > len(segment): BREAK
            // sliding window of size windowSize
            freq = Counter()
            FOR i FROM 0 TO len(segment)-1:
                freq[segment[i]] += 1
                IF i >= windowSize:
                    freq[segment[i - windowSize]] -= 1
                IF i >= windowSize - 1:
                    // check if all freq values are 0 or k
                    IF all(v == 0 or v == k for v in freq.values()):
                        count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(26 × n) | O(26) |

---

## Key Takeaway

> The adjacency constraint partitions the problem into independent segments. Within each, try all possible numbers of distinct characters (1–26) with a fixed-size sliding window.
