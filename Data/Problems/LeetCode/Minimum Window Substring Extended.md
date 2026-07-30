# Sliding Window Pattern Collection

**Difficulty:** 🟡 Medium
**LeetCode:** 
**Companies:** 

---

## Problem Description
This collection expands on the classic *Minimum Window Substring* problem, presenting variations that require finding substrings meeting additional constraints such as character frequency limits, multiple target strings, or weighted costs. The goal is to locate the smallest contiguous segment of a source string that satisfies the given condition.

## Examples
| Source | Condition | Minimum Window |
|--------|-----------|----------------|
| "adobecodebanc" | contains all chars of "abc" | "banc" |
| "aabcbcdbca" | contains at least two `a`s and one `c` | "abcbc" |
| "xyz" | contains any permutation of "zyx" | "xyz" |

## Approach
**Algorithm:** Variable‑size sliding window with a frequency map.
1. Build a frequency map of required characters.
2. Expand the right pointer, updating a window map and a `formed` counter.
3. When the window satisfies the requirement, shrink from the left to minimize length while maintaining validity.
4. Track the best window seen.

### Pseudocode
```text
FUNCTION minWindowExtended(s, requirement):
    // requirement: map<char, requiredCount>
    SET required ← SIZE(requirement)
    SET left ← 0, right ← 0
    SET formed ← 0
    CREATE windowCounts ← empty map
    SET ans ← (∞, 0, 0) // length, left, right

    WHILE right < LENGTH(s):
        SET c ← s[right]
        INCREMENT windowCounts[c]
        IF c IN requirement AND windowCounts[c] == requirement[c]:
            SET formed ← formed + 1
        // Try to contract while window is valid
        WHILE left <= right AND formed == required:
            // Update answer
            IF (right - left + 1) < ans[0]:
                SET ans ← (right - left + 1, left, right)
            SET c_left ← s[left]
            DECREMENT windowCounts[c_left]
            IF c_left IN requirement AND windowCounts[c_left] < requirement[c_left]:
                SET formed ← formed - 1
            SET left ← left + 1
        SET right ← right + 1
    IF ans[0] == ∞: RETURN ""
    RETURN SUBSTRING(s, ans[1], ans[2] + 1)
```

## Walkthrough
Take `s = "adobecodebanc"`, requirement = `{a:1, b:1, c:1}`.
| Step | right char | windowCounts | formed | left moves | Current best |
|------|------------|--------------|--------|------------|--------------|
| 1 | a | {a:1} | 1 | – | – |
| 2‑5 | d,o,b,e | {a:1,b:1,...} | 2 | – | – |
| 6‑9 | c,o,d,e | {a:1,b:1,c:1,...} | 3 (valid) | shrink left until `a` removed → window "banc" length 4 | "banc" |

## Complexity Analysis
- Time: O(n + m) where *n* is length of `s` and *m* is size of requirement map.
- Space: O(m) for the frequency maps.

## Follow‑Up Questions
1. How would you adapt the algorithm for multiple target strings simultaneously?
2. Can the approach handle weighted characters where each character has a cost?
3. What changes are needed if the window must contain at most `k` distinct characters?

## Key Takeaway
A variable‑size sliding window combined with a frequency map lets you shrink the window to the smallest possible segment that still satisfies all required character counts, achieving linear time.
