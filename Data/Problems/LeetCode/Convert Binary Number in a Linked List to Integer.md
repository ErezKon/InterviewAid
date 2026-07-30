# 1290. Convert Binary Number in a Linked List to Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer)
**Companies:** Amazon, Bloomberg, Cisco, Google, Mathworks, Meta, Microsoft, Nutanix, Oracle, Roblox

---

## Problem Description
Given the head of a singly‑linked list where each node contains a binary digit (`0` or `1`), interpret the linked list as a binary number with the most significant bit at the head and return its decimal value.

## Examples
**Example 1:**
```
Input: head = [1,0,1]
Output: 5
Explanation: Binary 101 = 5 in decimal.
```
**Example 2:**
```
Input: head = [0]
Output: 0
```

## Approach
Traverse the list, shifting the accumulated result left by one (multiply by 2) and adding the current node's value.

**Pseudocode**
```text
FUNCTION getDecimalValue(head):
    SET result ← 0
    WHILE head IS NOT NULL:
        SET result ← result * 2 + head.val
        SET head ← head.next
    RETURN result
```

## Walkthrough
For `head = [1,0,1]`:
| Step | node.val | result before | result after |
|------|----------|---------------|--------------|
|1|1|0|0*2+1 = 1|
|2|0|1|1*2+0 = 2|
|3|1|2|2*2+1 = 5|
The final result is 5.

## Complexity Analysis
- **Time:** O(n) – one pass through the list.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you handle a list that represents a number larger than the 32‑bit integer range?
2. Can the algorithm be adapted to work with a doubly‑linked list without changing the logic?
3. What if the bits were stored in reverse order (least‑significant bit first)?

## Key Takeaway
Iteratively shift‑and‑add while traversing the list to convert binary to decimal in linear time and constant space.
