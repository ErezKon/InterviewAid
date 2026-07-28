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

```text
FUNCTION bagOfTokensScore(tokens, power):
    // Sort tokens to access cheapest and most expensive easily
    SORT tokens
    lo ← 0
    hi ← LENGTH(tokens) - 1
    score ← 0
    maxScore ← 0
    
    WHILE lo ≤ hi:
        IF power ≥ tokens[lo]:
            // Play cheapest token face‑up
            power ← power - tokens[lo]
            lo ← lo + 1
            score ← score + 1
            maxScore ← MAX(maxScore, score)
        ELSE IF score > 0:
            // Play most expensive token face‑down
            power ← power + tokens[hi]
            hi ← hi - 1
            score ← score - 1
        ELSE:
            BREAK
    RETURN maxScore
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## 4. Examples

| tokens | power | Expected Score |
|--------|-------|----------------|
| [100] | 50 | 0 |
| [100,200] | 150 | 1 |
| [100,200,300,400] | 200 | 2 |

*Explanation*: In the third example, play token 100 face‑up (power = 100, score = 1), then play token 400 face‑down (score = 0, power = 500), finally play token 200 face‑up (power = 300, score = 1) and token 300 face‑up (power = 0, score = 2). The maximum score achieved is 2.

---

## 5. Walkthrough

Consider `tokens = [100,200,300,400]` and `power = 200`.

| Step | lo token | hi token | power | score | maxScore |
|------|----------|----------|-------|-------|----------|
| Start | 100 | 400 | 200 | 0 | 0 |
| 1 (face‑up) | 200 | 400 | 100 | 1 | 1 |
| 2 (face‑down) | 200 | 300 | 500 | 0 | 1 |
| 3 (face‑up) | 300 | 300 | 400 | 1 | 1 |
| 4 (face‑up) | 400 | 300 | 100 | 2 | 2 |
| End | – | – | 100 | 2 | 2 |

The algorithm tracks the maximum score (`maxScore`) because the score may temporarily drop when swapping a token face‑down.

---

## 6. Complexity Analysis

- **Time:** Sorting dominates → `O(n log n)`, where `n` is the number of tokens.
- **Space:** Sorting can be done in‑place; the algorithm uses only a few pointers and counters → `O(1)` auxiliary space.

---

## Key Takeaway

> Sort + greedy two-pointer: spend power on cheapest tokens (gain score), spend score on most expensive tokens (gain power). Track max score throughout since we might temporarily lose score to gain power.
