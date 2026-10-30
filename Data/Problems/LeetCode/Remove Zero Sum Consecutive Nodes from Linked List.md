# 1171. Remove Zero Sum Consecutive Nodes from Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list](https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list)
**Companies:** Amazon, Bloomberg, Bytedance, Google, Josh Technology, Uber

---

## Problem Description

Given the `head` of a linked list, we repeatedly delete consecutive sequences of nodes that sum to `0` until there are no such sequences.

After doing so, return the head of the final linked list. You may return any such answer.

(Note that in the examples below, all sequences are serializations of `ListNode` objects.)

**Constraints:**
- The given linked list will contain between `1` and `1000` nodes.
- Each node in the linked list has `-1000 <= node.val <= 1000`.

## Examples

**Example 1:**
```
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.
```

**Example 2:**
```
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
```

**Example 3:**
```
Input: head = [1,2,3,-3,-2]
Output: [1]
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