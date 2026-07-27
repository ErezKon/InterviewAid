# 817. Linked List Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-components](https://leetcode.com/problems/linked-list-components)
**Companies:** Amazon, Bloomberg, Google, Uber

---

## 1. Problem Description

Given a linked list and a subset of values `nums`, return the number of connected components in the list formed by the subset values.

---

## 2. Approach: Set + Linear Scan — O(n) ✅

```
FUNCTION numComponents(head, nums):
    numSet = SET(nums)
    count = 0
    inComponent = false

    WHILE head:
        IF head.val IN numSet:
            IF NOT inComponent:
                count += 1
                inComponent = true
        ELSE:
            inComponent = false
        head = head.next

    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(G) where G = |nums| |

---

## 3. Key Takeaway

> Count transitions from outside to inside the subset. Each new "run" of subset values is one connected component.
