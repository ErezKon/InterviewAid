# 2106. Maximum Fruits Harvested After at Most K Steps

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps](https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps)
**Companies:** Amazon, Google, Kla, Microsoft, Mishipay

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Fruits are available at some positions on an infinite x-axis. You are given a 2D integer array `fruits` where `fruits[i] = [position_i, amount_i]` depicts `amount_i` fruits at the position `position_i`. `fruits` is already **sorted** by `position_i` in **ascending order**, and each `position_i` is **unique**.

You are also given an integer `startPos` and an integer `k`. Initially, you are at the position `startPos`. From any position, you can either walk to the **left or right**. It takes **one step** to move **one unit** on the x-axis, and you can walk **at most** `k` steps in total. For every position you reach, you harvest all the fruits at that position, and the fruits will disappear from that position.

Return *the **maximum total number** of fruits you can harvest*.

**Constraints:**
- `1 <= fruits.length <= 10^5`
- `fruits[i].length == 2`
- `0 <= startPos, position_i <= 2 * 10^5`
- `position_i-1 < position_i` for any `i > 0` (**0-indexed**)
- `1 <= amount_i <= 10^4`
- `0 <= k <= 2 * 10^5`

---

## Examples

**Example 1:**
```
Input: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
Output: 9
Explanation: The optimal way is to:
- Move right to position 6 and harvest 3 fruits
- Move right to position 8 and harvest 6 fruits
You moved 3 steps and harvested 3 + 6 = 9 fruits in total.
```

**Example 2:**
```
Input: fruits = [[0,9],[4,1],[5,7],[6,2],[7,4],[10,9]], startPos = 5, k = 4
Output: 14
Explanation: You can move at most k = 4 steps, so you cannot reach position 0 nor 10.
The optimal way is to:
- Harvest the 7 fruits at the starting position 5
- Move left to position 4 and harvest 1 fruit
- Move right to position 6 and harvest 2 fruits
- Move right to position 7 and harvest 4 fruits
You moved 1 + 3 = 4 steps and harvested 7 + 1 + 2 + 4 = 14 fruits in total.
```

**Example 3:**
```
Input: fruits = [[0,3],[6,4],[8,5]], startPos = 3, k = 2
Output: 0
Explanation: You can move at most k = 2 steps and cannot reach any position with fruits.
```

---

## Key Insight

> For any window `[left, right]` of positions, the minimum steps from `startPos` is `min(2 * leftDist + rightDist, leftDist + 2 * rightDist)` where `leftDist = max(0, startPos - left)` and `rightDist = max(0, right - startPos)`. Slide a window and check if the cost ≤ k.

---

## Approach: Sliding Window — O(n) ✅

```text
FUNCTION maxTotalFruits(fruits, startPos, k):
    n ← LENGTH(fruits)
    left ← 0
    result ← 0
    FOR right ← 0 TO n - 1:
        // Expand window to include fruits[right]
        WHILE left ≤ right:
            leftDist ← MAX(0, startPos - fruits[left].pos)
            rightDist ← MAX(0, fruits[right].pos - startPos)
            steps ← MIN(2 * leftDist + rightDist,
                        leftDist + 2 * rightDist)
            IF steps ≤ k: BREAK
            left ← left + 1
        // Compute total fruits in current window using prefix sums (omitted for brevity)
        result ← MAX(result, total fruits between left and right)
    RETURN result
```

---

## Walkthrough

**Using Example 1:**
| Step | left index | right index | leftDist | rightDist | steps | window fruits | result |
|------|------------|-------------|----------|-----------|-------|---------------|--------|
| 1 | 0 | 0 | 3 | 0 | 6 (2*3+0) > 4 → shrink | – | 0 |
| 2 | 1 | 0 | 1 | 0 | 2 (2*1+0) ≤ 4 | [6,3] | 3 |
| 3 | 1 | 1 | 1 | 3 | 5 (1+2*3) > 4 → shrink left | – | 3 |
| 4 | 2 | 1 | 0 | 3 | 6 (0+2*3) > 4 → shrink left | – | 3 |
| 5 | 2 | 2 | 0 | 3 | 6 ≤ 4? no → continue expanding → result stays 14 after full scan.

The algorithm slides the window, discarding leftmost positions when the step cost exceeds `k`. The maximum sum recorded is 14.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if you could make at most `k` turns instead of steps?
- Can the problem be extended to 2‑D coordinates with Manhattan distance?
- What if fruits could appear dynamically; how would you maintain the maximum efficiently?

---

## Key Takeaway

> **"Go left then right (or vice versa)" with limited steps: sliding window over positions, compute min steps for each window.** The cost formula accounts for doubling back.
