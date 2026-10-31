# 492. Construct the Rectangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-the-rectangle](https://leetcode.com/problems/construct-the-rectangle)
**Companies:** Amazon, Google

---

## Problem Description

A web developer needs to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:

- The area of the rectangular web page you designed must equal to the given target area.
- The width `W` should not be larger than the length `L`, which means `L >= W`.
- The difference between length `L` and width `W` should be as small as possible.

Return *an array `[L, W]` where `L` and `W` are the length and width of the web page you designed in sequence.*

**Constraints:**
- `1 <= area <= 10^7`

## Examples

**Example 1:**
```
Input: area = 4
Output: [2,2]
Explanation: The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1].
But according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.
```

**Example 2:**
```
Input: area = 37
Output: [37,1]
```

**Example 3:**
```
Input: area = 122122
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
- **Time:** `O(√area)` – at most the square-root iterations.
- **Space:** `O(1)` – constant extra space.

## Follow-Up Questions
1. How would you modify the algorithm to return all possible `[L, W]` pairs?
2. Can you solve the problem without using the square-root function?
3. How would the solution change if `area` could be up to `10^12` and you need to avoid overflow?

## Key Takeaway
Searching downward from the square root quickly finds the divisor pair with minimal length-width difference.
