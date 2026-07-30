# 1171. Remove Zero Sum Consecutive Nodes from Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list](https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list)
**Companies:** Amazon, Bloomberg, Bytedance, Google, Josh Technology, Uber

---

## Problem Description
Given the head of a singly‑linked list, remove every consecutive sequence of nodes that sums to zero. After removal, concatenate the remaining parts and return the head of the resulting list. The list may contain positive, negative, or zero values.

## Examples
**Example 1:**
```
Input: head = [1,2,-3,3,1]
Output: [3,1]
Explanation: The sequence 1,2,-3 sums to 0 and is removed. The remaining list is 3→1.
```
**Example 2:**
```
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
Explanation: The subsequence 3,-3 sums to 0 and is removed.
```

## Approach
Use prefix sums with a hash map to locate the farthest node that shares the same cumulative sum. In the first pass, store the last occurrence of each prefix sum. In the second pass, reconnect each node to the node after the last occurrence, thereby skipping zero‑sum intervals.

```text
FUNCTION removeZeroSumSublists(head):
    SET dummy ← ListNode(0)
    dummy.next ← head
    SET prefixSum ← 0
    SET prefixMap ← EMPTY MAP
    SET node ← dummy
    // First pass: record last node for each prefix sum
    WHILE node IS NOT NULL:
        SET prefixSum ← prefixSum + node.val
        SET prefixMap[prefixSum] ← node
        SET node ← node.next
    // Second pass: skip zero‑sum intervals
    SET prefixSum ← 0
    SET node ← dummy
    WHILE node IS NOT NULL:
        SET prefixSum ← prefixSum + node.val
        SET node.next ← prefixMap[prefixSum].next
        SET node ← node.next
    RETURN dummy.next
```

## Walkthrough
| Step | node.val | prefixSum | prefixMap[prefixSum] | Action |
|------|----------|-----------|----------------------|--------|
| 1 | 0 (dummy) | 0 | dummy | record |
| 2 | 1 | 1 | node(1) | record |
| 3 | 2 | 3 | node(2) | record |
| 4 | -3 | 0 | node(-3) (overwrites) | record |
| 5 | 3 | 3 | node(3) (overwrites) | record |
| 6 | 1 | 4 | node(1) | record |
Second pass uses these mappings to jump over the 1→2→-3 segment.

## Complexity Analysis
- Time: O(n) where *n* is the number of nodes (two linear passes).
- Space: O(n) for the hash map storing prefix sums.

## Follow-Up Questions
1. How would you adapt the algorithm to remove only the *first* zero‑sum sublist?
2. Can this be solved in‑place without extra hash‑map storage?
3. How would you handle a circular linked list version of the problem?

## Key Takeaway
By tracking prefix sums and their last occurrences, you can eliminate any zero‑sum consecutive segment in a single pass, turning a seemingly complex removal into a simple pointer jump.