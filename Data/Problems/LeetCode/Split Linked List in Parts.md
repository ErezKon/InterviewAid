# 725. Split Linked List in Parts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-linked-list-in-parts](https://leetcode.com/problems/split-linked-list-in-parts)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given the `head` of a singly linked list and an integer `k`, split the linked list into `k` consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return *an array of the* `k` *parts*.

**Constraints:**
- The number of nodes in the list is in the range `[0, 1000]`.
- `0 <= Node.val <= 1000`
- `1 <= k <= 50`

## Examples

**Example 1:**
```
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].
```

**Example 2:**
```
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.
```

## Approach
First pass to count the total number of nodes. Compute `baseSize = length // k` and `extra = length % k`. Then iterate `k` times, cutting off `baseSize + (1 if i < extra else 0)` nodes for each part and severing the link to the next part.

```text
FUNCTION splitListToParts(head, k):
    // Count total nodes
    SET length ← 0
    SET cur ← head
    WHILE cur IS NOT NULL:
        SET length ← length + 1
        SET cur ← cur.next

    SET baseSize ← length DIV k
    SET extra ← length MOD k
    SET result ← ARRAY of size k initialized to NULL
    SET cur ← head
    FOR i ← 0 TO k - 1:
        SET result[i] ← cur
        SET partLen ← baseSize + (1 IF i < extra ELSE 0)
        FOR j ← 0 TO partLen - 2:   // stop at node before last in this part
            IF cur IS NOT NULL:
                SET cur ← cur.next
        IF cur IS NOT NULL:
            SET nextPart ← cur.next
            SET cur.next ← NULL   // break link
            SET cur ← nextPart
    RETURN result
```

## Walkthrough
For `head = [1,2,3,4,5,6,7,8,9,10]`, `k = 3`:
- `length = 10`, `baseSize = 3`, `extra = 1`.
- Part 0: `partLen = 4`; traverse nodes 1→2→3→4, cut after 4.
- Part 1: `partLen = 3`; traverse 5→6→7, cut after 7.
- Part 2: `partLen = 3`; traverse 8→9→10, end of list.
Result matches expected output.

## Complexity Analysis
- **Time:** Two passes over the list → `O(n)` where `n` is the number of nodes.
- **Space:** Output array of size `k` → `O(k)` auxiliary space.

## Follow‑Up Questions
1. How would you modify the algorithm to split the list into parts of exactly equal size, discarding extra nodes?
2. Can the split be performed in a single pass without counting length first?
3. What changes are needed if the list is doubly linked?

## Key Takeaway
By first determining the total length, we can compute each part’s size and then sever the list accordingly, achieving an even distribution of nodes across `k` parts.
