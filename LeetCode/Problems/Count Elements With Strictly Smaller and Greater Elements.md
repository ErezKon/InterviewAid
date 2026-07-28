# 2148. Count Elements With Strictly Smaller and Greater Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements](https://leetcode.com/problems/count-elements-with-strictly-smaller-and-greater-elements)
**Companies:** Google

---

## 1. Problem Description

Given an integer array `nums`, count how many elements have **both** a strictly smaller element and a strictly larger element somewhere else in the array.

---

## 2. Approach: Find Min/Max — O(n) ✅

```text
FUNCTION countElements(nums):
    // Find global minimum and maximum
    SET minVal ← MIN(nums)
    SET maxVal ← MAX(nums)
    SET result ← 0
    FOR x IN nums:
        IF minVal < x AND x < maxVal:
            SET result ← result + 1
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: nums = [11,7,2,15]
Output: 2
Explanation: The minimum is 2 and the maximum is 15. Elements 7 and 11 lie strictly between them.
```

**Example 2:**
```
Input: nums = [1,2,3]
Output: 1
Explanation: Only the element 2 has both a smaller (1) and a larger (3) element.
```

---

## Walkthrough

For `nums = [11,7,2,15]`:
| Step | Current value | Condition `min < x < max` | Result |
|------|---------------|---------------------------|--------|
| 1    | 11            | 2 < 11 < 15 → true        | result = 1 |
| 2    | 7             | 2 < 7 < 15 → true         | result = 2 |
| 3    | 2             | false (equal to min)      | result unchanged |
| 4    | 15            | false (equal to max)      | result unchanged |
The final count is 2.

---

## Complexity Analysis

- **Time:** O(n) – one pass to find min/max and another pass to count.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you modify the algorithm if the array were streamed and you could only keep O(1) memory?
2. Can you extend the solution to return the actual qualifying elements, not just the count?
3. What if the requirement changed to “strictly smaller *and* strictly larger *by at least* k”?

---

## Key Takeaway

> An element qualifies iff it lies strictly between the global minimum and maximum of the array.
