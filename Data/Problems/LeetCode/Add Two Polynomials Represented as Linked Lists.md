# 1634. Add Two Polynomials Represented as Linked Lists

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists)
**Companies:** Amazon

---

## 1. Problem Description

A polynomial linked list is a special type of linked list where every node represents a term in a polynomial expression.

Each node has three attributes:

- `coefficient`: an integer representing the number multiplier of the term. The coefficient of the term `9x^4` is `9`.
- `power`: an integer representing the exponent. The power of the term `9x^4` is `4`.
- `next`: a pointer to the next node in the list, or `null` if it is the last node of the list.

For example, the polynomial `5x^3 + 4x - 7` is represented by the polynomial linked list `[5,3] → [4,1] → [-7,0]`.

The polynomial linked list must be in its standard form: the polynomial must be in **strictly** descending order by its `power` value. Also, terms with a `coefficient` of `0` are omitted.

Given two polynomial linked list heads, `poly1` and `poly2`, add the polynomials together and return *the head of the sum of the polynomials*.

**`PolyNode` format:**

The input/output format is as a list of `n` nodes, where each node is represented as its `[coefficient, power]`. For example, the polynomial `5x^3 + 4x - 7` would be represented as: `[[5,3],[4,1],[-7,0]]`.

**Constraints:**
- `0 <= n <= 10^4`
- `-10^9 <= PolyNode.coefficient <= 10^9`
- `PolyNode.coefficient != 0`
- `0 <= PolyNode.power <= 10^9`
- `PolyNode.power > PolyNode.next.power`

---

## 2. Examples

```
Example 1:
  Input: poly1 = [[1,1]], poly2 = [[1,0]]
  Output: [[1,1],[1,0]]
  Explanation: poly1 = x. poly2 = 1. The sum is x + 1.
```
```
Example 2:
  Input: poly1 = [[2,2],[4,1],[3,0]], poly2 = [[3,2],[-4,1],[-1,0]]
  Output: [[5,2],[2,0]]
  Explanation: poly1 = 2x^2 + 4x + 3. poly2 = 3x^2 - 4x - 1. The sum is 5x^2 + 2. Notice that we omit the "0x" term.
```
```
Example 3:
  Input: poly1 = [[1,2]], poly2 = [[-1,2]]
  Output: []
  Explanation: The sum is 0. We return an empty list.
```

---

## 3. Approach: Merge — O(n + m) ✅

```text
FUNCTION addPoly(poly1, poly2):
    dummy ← new ListNode(0, -1)
    curr ← dummy
    WHILE poly1 AND poly2:
        IF poly1.power > poly2.power:
            curr.next ← poly1
            poly1 ← poly1.next
        ELSE IF poly1.power < poly2.power:
            curr.next ← poly2
            poly2 ← poly2.next
        ELSE:
            sumCoeff ← poly1.coefficient + poly2.coefficient
            IF sumCoeff != 0:
                curr.next ← new ListNode(sumCoeff, poly1.power)
                curr ← curr.next
            poly1 ← poly1.next
            poly2 ← poly2.next
    END WHILE
    curr.next ← poly1 IF poly1 ELSE poly2
    RETURN dummy.next
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Initialise a dummy head to build the result list. |
| 2 | Compare the `power` of the current nodes of both lists. |
| 3 | Append the node with the larger power to the result. |
| 4 | If powers are equal, add the coefficients; if the sum is non‑zero, create a new node with that sum and the shared power. |
| 5 | Advance the pointers of the processed list(s). |
| 6 | After one list is exhausted, link the remaining nodes of the other list. |
| 7 | Return the list after the dummy head. |

---

## 5. Complexity Analysis

- **Time:** O(n + m) – each node of both input lists is visited once.
- **Space:** O(1) extra – the result reuses existing nodes; only a constant amount of auxiliary space is used.

---

## 6. Follow-Up Questions

1. How would you handle polynomials stored in ascending order of power? |
2. How can you modify the algorithm to support multiplication of two polynomial linked lists? |
3. What changes are needed if the coefficients are large integers requiring arbitrary‑precision arithmetic? |

---

## Key Takeaway

> Adding two polynomial linked lists is a classic merge‑like process: traverse both lists in order of decreasing power, combine coefficients when powers match, and preserve the sorted order.
