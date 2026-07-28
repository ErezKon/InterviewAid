# 492. Construct the Rectangle

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google

---

## Problem Description
Given an integer `area` representing the area of a rectangle, find the dimensions `[L, W]` (length and width) such that `L * W = area`, `L >= W`, and the difference `L - W` is minimized. Return any pair that satisfies these conditions.

## Examples
**Example 1:**
```
area = 4
Possible pairs: [2,2], [4,1]
Best pair: [2,2]
Output: [2,2]
```
**Example 2:**
```
area = 37
Only pair: [37,1]
Output: [37,1]
```
**Example 3:**
```
area = 122122
Best pair: [427,286]
Output: [427,286]
```

## Approach
Start from the integer square root of `area` and move downwards until a divisor is found. The first divisor `w` yields the optimal width, and `l = area / w` is the corresponding length.

```text
FUNCTION constructRectangle(area):
    SET w ← FLOOR(SQRT(area))
    WHILE area MOD w ≠ 0:
        SET w ← w - 1
    SET l ← area / w
    RETURN [l, w]
```

## Walkthrough
| area | start w = sqrt(area) | w after loop | l = area / w |
|------|----------------------|-------------|--------------|
| 4    | 2                    | 2 (divides) | 2            |
| 37   | 6                    | 1 (no divisor until 1) | 37 |
| 122122 | 349 (≈ sqrt)        | 286 (first divisor) | 427 |

## Complexity Analysis
- **Time:** `O(√area)` – at most the square‑root iterations.
- **Space:** `O(1)` – constant extra space.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible `[L, W]` pairs?
2. Can you solve the problem without using the square‑root function?
3. How would the solution change if `area` could be up to `10^12` and you need to avoid overflow?

## Key Takeaway
Searching downward from the square root quickly finds the divisor pair with minimal length‑width difference.
