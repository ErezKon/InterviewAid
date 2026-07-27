# 1290. Convert Binary Number in a Linked List to Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer)
**Companies:** Amazon, Bloomberg, Cisco, Google, Mathworks, Meta, Microsoft, Nutanix, Oracle, Roblox

---

```
FUNCTION getDecimalValue(head):
    result = 0
    WHILE head:
        result = result * 2 + head.val
        head = head.next
    RETURN result
```
