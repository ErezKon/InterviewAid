# 948. Bag of Tokens

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bag-of-tokens](https://leetcode.com/problems/bag-of-tokens)
**Companies:** Flexport, Google

---

## 1. Problem Description

Given tokens with values and initial power, you can play tokens face-up (spend power = token value, gain 1 score) or face-down (spend 1 score, gain power = token value). Maximize your score.

**Constraints:**
- `0 ≤ tokens.length ≤ 1000`
- `0 ≤ tokens[i], power ≤ 10⁴`

---

## 2. Key Insight

> **Greedy two-pointer**: Sort tokens. Play the cheapest token face-up (spend power for score), play the most expensive face-down (spend score for power). Always try to gain score cheaply and gain power expensively.

---

## 3. Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION bagOfTokensScore(tokens, power):
    SORT tokens
    lo, hi = 0, len(tokens) - 1
    score = 0; maxScore = 0
    
    WHILE lo <= hi:
        IF power >= tokens[lo]:
            power -= tokens[lo]; lo += 1
            score += 1
            maxScore = MAX(maxScore, score)
        ELSE IF score > 0:
            power += tokens[hi]; hi -= 1
            score -= 1
        ELSE:
            BREAK
    RETURN maxScore
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## Key Takeaway

> Sort + greedy two-pointer: spend power on cheapest tokens (gain score), spend score on most expensive tokens (gain power). Track max score throughout since we might temporarily lose score to gain power.
