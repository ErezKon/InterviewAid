# 382. Linked List Random Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/linked-list-random-node](https://leetcode.com/problems/linked-list-random-node)
**Companies:** Google, Meta, Nvidia

---

## 1. Problem Description

Given a singly linked list, return a random node's value from the linked list. Each node must have the **same probability** of being chosen.

Implement the `Solution` class:

- `Solution(ListNode head)` Initializes the object with the head of the singly-linked list `head`.
- `int getRandom()` Chooses a node randomly from the list and returns its value. All the nodes of the list should be equally likely to be chosen.

**Follow up:**

- What if the linked list is extremely large and its length is unknown to you?
- Could you solve this efficiently without using extra space?

**Constraints:**
- The number of nodes in the linked list will be in the range `[1, 10^4]`.
- `-10^4 <= Node.val <= 10^4`
- At most `10^4` calls will be made to `getRandom`.

---

## 2. Examples

**Example 1:**
```
Input
["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], [], [], []]
Output:
[null, 1, 3, 2, 2, 3]
Explanation:
Solution solution = new Solution([1, 2, 3]);
solution.getRandom(); // return 1
solution.getRandom(); // return 3
solution.getRandom(); // return 2
solution.getRandom(); // return 2
solution.getRandom(); // return 3
// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
```

---

## 3. Approach

**Reservoir Sampling (k=1)** – Iterate through the list, keeping a single candidate. Replace the candidate with the current node's value with probability `1/i` at the i-th node.

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

> Reservoir sampling lets you pick a uniformly random element from an unknown-size list using constant extra space.
