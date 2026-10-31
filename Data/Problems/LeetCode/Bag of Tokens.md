# 948. Bag of Tokens

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bag-of-tokens](https://leetcode.com/problems/bag-of-tokens)
**Companies:** Flexport, Google

---

## 1. Problem Description

You start with an initial **power** of `power`, an initial **score** of `0`, and a bag of tokens given as an integer array `tokens`, where each `tokens[i]` denotes the value of token*_i*.

Your goal is to **maximize** the total **score** by strategically playing these tokens. In one move, you can play an **unplayed** token in one of the two ways (but not both for the same token):

- **Face-up**: If your current power is **at least** `tokens[i]`, you may play token*_i*, losing `tokens[i]` power and gaining `1` score.
- **Face-down**: If your current score is **at least** `1`, you may play token*_i*, gaining `tokens[i]` power and losing `1` score.

Return *the **maximum** possible score you can achieve after playing **any** number of tokens*.

**Constraints:**
- `0 <= tokens.length <= 1000`
- `0 <= tokens[i], power < 10^4`

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
            // Play cheapest token face-up
            power ← power - tokens[lo]
            lo ← lo + 1
            score ← score + 1
            maxScore ← MAX(maxScore, score)
        ELSE IF score > 0:
            // Play most expensive token face-down
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

**Example 1:**
```
Input: tokens = [100], power = 50
Output: 0
Explanation: Since your score is 0 initially, you cannot play the token face-down. You also cannot play it face-up since your power (50) is less than tokens[0] (100).
```

**Example 2:**
```
Input: tokens = [200,100], power = 150
Output: 1
Explanation: Play token*_1* (100) face-up, reducing your power to 50 and increasing your score to 1.
There is no need to play token*_0*, since you cannot play it face-up to add to your score. The maximum score achievable is 1.
```

**Example 3:**
```
Input: tokens = [100,200,300,400], power = 200
Output: 2
Explanation: Play the tokens in this order to get a score of 2:
- Play token*_0* (100) face-up, reducing power to 100 and increasing score to 1.
- Play token*_3* (400) face-down, increasing power to 500 and reducing score to 0.
- Play token*_1* (200) face-up, reducing power to 300 and increasing score to 1.
- Play token*_2* (300) face-up, reducing power to 0 and increasing score to 2.
The maximum score achievable is 2.
```

---

## 5. Walkthrough

Consider `tokens = [100,200,300,400]` and `power = 200`.

| Step | lo token | hi token | power | score | maxScore |
|------|----------|----------|-------|-------|----------|
| Start | 100 | 400 | 200 | 0 | 0 |
| 1 (face-up) | 200 | 400 | 100 | 1 | 1 |
| 2 (face-down) | 200 | 300 | 500 | 0 | 1 |
| 3 (face-up) | 300 | 300 | 400 | 1 | 1 |
| 4 (face-up) | 400 | 300 | 100 | 2 | 2 |
| End | – | – | 100 | 2 | 2 |

The algorithm tracks the maximum score (`maxScore`) because the score may temporarily drop when swapping a token face-down.

---

## 6. Complexity Analysis

- **Time:** Sorting dominates → `O(n log n)`, where `n` is the number of tokens.
- **Space:** Sorting can be done in-place; the algorithm uses only a few pointers and counters → `O(1)` auxiliary space.

---

## Key Takeaway

> Sort + greedy two-pointer: spend power on cheapest tokens (gain score), spend score on most expensive tokens (gain power). Track max score throughout since we might temporarily lose score to gain power.
