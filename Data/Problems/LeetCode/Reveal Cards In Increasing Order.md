# 950. Reveal Cards In Increasing Order

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reveal-cards-in-increasing-order](https://leetcode.com/problems/reveal-cards-in-increasing-order)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given a deck of cards, reorder them so that when you repeatedly **reveal the top card** then **move the next card to the bottom**, the revealed cards come out in increasing order.

**Constraints:**
- `1 <= deck.length <= 1000`
- `1 <= deck[i] <= 10^6`
- All values are unique

---

## Examples

**Example:**
- **Input:** `deck = [17,13,11,2,3,5,7]`
- **Output:** `[2,13,3,11,5,17,7]`
- **Explanation:** Reveal 2, move 13 to bottom → reveal 3, move 11 → reveal 5, move 17 → reveal 7 → reveal 11 → reveal 13 → reveal 17.

---

## Key Insight

> Simulate the reveal process using a **queue of indices**. Assign the smallest card to the first revealed index, second smallest to the second, etc.

---

## Approach

```
FUNCTION deckRevealedIncreasing(deck):
    SORT deck
    queue = deque(range(len(deck)))
    result = [0] * len(deck)
    FOR card IN deck:
        result[queue.POPLEFT()] = card
        IF queue: queue.APPEND(queue.POPLEFT())
    RETURN result
```

Simulate the reveal process with indices, assign sorted cards in order.

---

## Walkthrough

`deck = [17,13,11,2,3,5,7]` → sorted: `[2,3,5,7,11,13,17]`

| Card | Dequeue idx | Assign          | Move next to back | Queue state       |
|------|------------|-----------------|-------------------|-------------------|
| 2    | 0          | result[0]=2     | move 1 to back    | [2,3,4,5,6,1]   |
| 3    | 2          | result[2]=3     | move 3 to back    | [4,5,6,1,3]     |
| 5    | 4          | result[4]=5     | move 5 to back    | [6,1,3,5]       |
| 7    | 6          | result[6]=7     | move 1 to back    | [3,5,1]         |
| 11   | 3          | result[3]=11    | move 5 to back    | [1,5]           |
| 13   | 1          | result[1]=13    | move 5 to back    | [5]             |
| 17   | 5          | result[5]=17    |                   | []               |

Result: `[2,13,3,11,5,17,7]` ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n log n) — sorting dominates |
| Space  | O(n) — queue + result array |

---

## Key Takeaway

> To arrange elements for a specific reveal order, **simulate the process with indices** rather than cards — assign sorted values to the positions in the order they would be revealed.
