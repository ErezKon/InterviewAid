# 83. Remove Duplicates from Sorted List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-list](https://leetcode.com/problems/remove-duplicates-from-sorted-list)
**Companies:** Adobe, Amazon, Bloomberg, Google, Mcdonalds, Meta, Microsoft, Nvidia, Oracle, Tcs

---

## Problem Description
Given the head of a sorted singly‑linked list, delete all duplicate nodes such that each element appears only once. Return the modified list, which should remain sorted.

## Examples
**Example 1**
```
Input: head = [1,1,2]
Output: [1,2]
Explanation: The second '1' is removed.
```
**Example 2**
```
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

## Approach
Iterate with a pointer `curr`. If `curr.val` equals `curr.next.val`, bypass the next node by linking `curr.next` to `curr.next.next`. Otherwise, move `curr` forward. Since the list is sorted, duplicates are adjacent.

```text
FUNCTION deleteDuplicates(head):
    curr ← head
    WHILE curr ≠ NULL AND curr.next ≠ NULL:
        IF curr.val = curr.next.val:
            curr.next ← curr.next.next
        ELSE:
            curr ← curr.next
    RETURN head
```

## Walkthrough
For `[1,1,2,3,3]`:
| Step | curr.val | Action | List state |
|------|----------|--------|------------|
| 1 | 1 | duplicate → skip second 1 | [1,2,3,3] |
| 2 | 1 → move to 2 | keep 2 |
| 3 | 2 → move to 3 | keep 3 |
| 4 | 3 | duplicate → skip second 3 | [1,2,3] |
Result `[1,2,3]`.

## Complexity Analysis
Time: `O(n)` where `n` is the number of nodes.
Space: `O(1)` extra.

## Follow-Up Questions
1. How would you modify the algorithm to keep exactly one copy of each duplicated value (i.e., remove extra copies but retain one)?
2. Can you solve the problem recursively?
3. What changes are needed if the list is doubly linked?

## Key Takeaway
A single pass with pointer manipulation removes adjacent duplicates in a sorted linked list.
