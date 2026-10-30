# 950. Reveal Cards In Increasing Order

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reveal-cards-in-increasing-order](https://leetcode.com/problems/reveal-cards-in-increasing-order)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

You are given an integer array `deck`. There is a deck of cards where every card has a unique integer. The integer on the `i^th` card is `deck[i]`.

You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck.

You will do the following steps repeatedly until all cards are revealed:

- Take the top card of the deck, reveal it, and take it out of the deck.
- If there are still cards in the deck then put the next top card of the deck at the bottom of the deck.
- If there are still unrevealed cards, go back to step 1. Otherwise, stop.

Return *an ordering of the deck that would reveal the cards in increasing order*.

**Note** that the first entry in the answer is considered to be the top of the deck.

**Constraints:**
- `1 <= deck.length <= 1000`
- `1 <= deck[i] <= 10^6`
- All the values of `deck` are **unique**.

---

## Examples

**Example 1:**
```
Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: We get the deck in the order [17,13,11,2,3,5,7] (this order does not matter), and reorder it.
After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck.
We reveal 2, and move 13 to the bottom.  The deck is now [3,11,5,17,7,13].
We reveal 3, and move 11 to the bottom.  The deck is now [5,17,7,13,11].
We reveal 5, and move 17 to the bottom.  The deck is now [7,13,11,17].
We reveal 7, and move 13 to the bottom.  The deck is now [11,17,13].
We reveal 11, and move 17 to the bottom.  The deck is now [13,17].
We reveal 13, and move 17 to the bottom.  The deck is now [17].
We reveal 17.
Since all the cards revealed are in increasing order, the answer is correct.
```

**Example 2:**
```
Input: deck = [1,1000]
Output: [1,1000]
```

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
