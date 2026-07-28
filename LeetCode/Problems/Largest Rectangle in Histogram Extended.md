# Monotonic Stack Applications

Related: #84, #85, #42, #739, #496, #503, #907, #1944

---

## Problem Description
Given an array of bar heights representing a histogram, find the area of the largest rectangle that can be formed by contiguous bars. The rectangle's height is limited by the shortest bar in the chosen range.

## Examples
**Example 1:**
```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The rectangle spanning indices 2‑3 (heights 5 and 6) has area 5*2 = 10.
```
**Example 2:**
```
Input: heights = [2,4]
Output: 4
```

## Approach
Use a monotonic increasing stack to find, for each bar, the index of the previous smaller bar and the next smaller bar. The width of the maximal rectangle with that bar as the limiting height is `right - left - 1`.
1. Iterate through heights, maintaining a stack of indices with increasing heights.
2. When a lower height appears, pop indices and compute area using the popped height as the minimum.
3. After the pass, pop remaining indices using `n` as the right boundary.

```text
FUNCTION largestRectangleArea(heights):
    SET stack ← []
    SET maxArea ← 0
    SET n ← LENGTH(heights)
    FOR i ← 0 TO n:
        SET curHeight ← heights[i] IF i < n ELSE 0
        WHILE stack IS NOT EMPTY AND curHeight < heights[stack.TOP()]:
            SET height ← heights[stack.POP()]
            SET right ← i
            SET left ← stack.TOP() IF stack IS NOT EMPTY ELSE -1
            SET width ← right - left - 1
            SET maxArea ← MAX(maxArea, height * width)
        stack.PUSH(i)
    RETURN maxArea
```

## Walkthrough
| i | curHeight | Stack (indices) | Action | Area computed |
|---|-----------|----------------|--------|---------------|
|0|2|[]|push 0| - |
|1|1|[0]|pop 0 → height 2, left -1, width 1 → area 2|push 1|
|2|5|[1]|push 2| - |
|3|6|[1,2]|push 3| - |
|4|2|[1,2,3]|pop 3 (h=6, w=1, a=6); pop 2 (h=5, w=2, a=10)|push 4|
|5|3|[1,4]|push 5| - |
|6|0|[1,4,5]|pop 5 (h=3, w=1, a=3); pop 4 (h=2, w=4, a=8); pop 1 (h=1, w=6, a=6)| - |

## Complexity Analysis
- **Time:** O(n) – each index is pushed and popped at most once.
- **Space:** O(n) – stack storage.

## Follow-Up Questions
1. How would you adapt the algorithm to return the coordinates of the maximal rectangle?
2. Can the same monotonic stack technique be used for the "Largest Rectangle in a Binary Matrix" problem?
3. What changes are needed if bars can have zero height?

## Key Takeaway
A monotonic increasing stack efficiently discovers the nearest smaller bars on both sides, enabling O(n) computation of the maximal rectangle area.
