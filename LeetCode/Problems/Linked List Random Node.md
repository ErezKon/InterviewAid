# 382. Linked List Random Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-random-node](https://leetcode.com/problems/linked-list-random-node)
**Companies:** Google, Meta, Nvidia

---

## 1. Problem Description

Return a random node's value from a linked list with equal probability. The list size is unknown.

---

## 2. Approach: Reservoir Sampling — O(n) ✅

```
CLASS Solution:
    CONSTRUCTOR(head):
        self.head = head

    FUNCTION getRandom():
        node = head
        result = node.val
        i = 1

        WHILE node:
            IF random(0, i) == 0:
                result = node.val
            node = node.next
            i += 1

        RETURN result
```

| Time | Space |
|------|-------|
| O(n) per call | O(1) |

---

## 3. Key Takeaway

> Reservoir sampling with k=1: replace current choice with probability 1/i at the i-th element. Each element has equal 1/n probability. Works without knowing n in advance.
