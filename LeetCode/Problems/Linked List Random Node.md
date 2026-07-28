# 382. Linked List Random Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-random-node](https://leetcode.com/problems/linked-list-random-node)
**Companies:** Google, Meta, Nvidia

---

## 1. Problem Description

Return a random node's value from a linked list with equal probability. The list size is unknown.

---

## 2. Examples

| Input (list) | Output | Explanation |
|--------------|--------|-------------|
| `[1,2,3]` | `2` (random) | Each node value (1,2,3) should be returned with probability 1/3. |
| `[10]` | `10` | Only one possible value, always returned.

---

## 3. Approach

**Reservoir Sampling (k=1)** – Iterate through the list, keeping a single candidate. Replace the candidate with the current node's value with probability `1/i` at the i‑th node.

```text
CLASS Solution:
    CONSTRUCTOR(head):
        SET self.head ← head

    FUNCTION getRandom():
        SET node ← self.head
        SET result ← node.val
        SET i ← 1
        WHILE node != null:
            IF randomInt(0, i) == 0:
                SET result ← node.val
            SET node ← node.next
            SET i ← i + 1
        RETURN result
```

---

## 4. Walkthrough

For list `[5,9,12]`:

| i | node.val | random(0,i) == 0? | result |
|---|----------|-------------------|--------|
| 1 | 5 | always true | 5 |
| 2 | 9 | 1/2 chance → suppose true | 9 |
| 3 | 12 | 1/3 chance → suppose false | 9 |

Final returned value is 9. Over many runs each element appears with equal probability.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(n) per `getRandom` call – one pass through the list |
| Space | O(1) – only a few variables stored |

---

## 6. Follow-Up Questions

1. How would you support `O(1)` `getRandom` after an `O(n)` preprocessing step?
2. Extend to return `k` random nodes uniformly.
3. How to handle a stream of nodes where the total length is unknown?

---

## Key Takeaway

> Reservoir sampling lets you pick a uniformly random element from an unknown‑size list using constant extra space.
