# 1836. Remove Duplicates From an Unsorted Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list](https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list)
**Companies:** Amazon, Microsoft

---

## Problem Description
Given the `head` of a linked list, find all the values that appear **more than once** in the list and delete the nodes that have any of those values.

Return *the linked list after the deletions.*

**Constraints:**

- The number of nodes in the list is in the range `[1, 10⁵]`
- `1 <= Node.val <= 10⁵`

## Examples

```
Example 1:
  Input: head = [1,2,3,2]
  Output: [1,3]
  Explanation: 2 appears twice in the linked list, so all 2's should be deleted. After deleting all 2's, we are left with [1,3].
```

```
Example 2:
  Input: head = [2,1,1,2]
  Output: []
  Explanation: 2 and 1 both appear twice. All the elements should be deleted.
```

```
Example 3:
  Input: head = [3,2,2,1,3,2,4]
  Output: [1,4]
  Explanation: 3 appears twice and 2 appears three times. After deleting all 3's and 2's, we are left with [1,4].
```

## Approach
Traverse the list while maintaining a hash set of seen values. For each node, if its value is already in the set, bypass it; otherwise, add the value to the set and keep the node.

```text
FUNCTION removeDuplicates(head):
    SET seen ← empty set
    SET dummy ← Node(0)               // dummy node before head
    SET dummy.next ← head
    SET prev ← dummy
    SET current ← head
    WHILE current IS NOT NULL:
        IF current.val IN seen:
            // skip duplicate node
            SET prev.next ← current.next
        ELSE:
            ADD current.val TO seen
            SET prev ← current
        SET current ← current.next
    RETURN dummy.next
```

## Walkthrough
| Step | Current Value | Seen Set | Action |
|------|---------------|----------|--------|
| 1 | 1 | {} | Add 1, keep node |
| 2 | 2 | {1} | Add 2, keep |
| 3 | 3 | {1,2} | Add 3, keep |
| 4 | 2 | {1,2,3} | 2 already seen → remove |
| 5 | 4 | {1,2,3} | Add 4, keep |
| 6 | 1 | {1,2,3,4} | 1 already seen → remove |

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes, each visited once.
- **Space:** O(N) for the hash set storing distinct values.

## Follow-Up Questions
1. How would you solve the problem without extra space?
2. How would the solution change for a doubly linked list?
3. Can you modify the algorithm to keep the *last* occurrence instead of the first?

## Key Takeaway
A hash set enables O(N) duplicate removal from an unsorted linked list while preserving order.
