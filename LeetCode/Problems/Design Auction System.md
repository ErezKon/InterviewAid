# 3815. Design Auction System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-auction-system](https://leetcode.com/problems/design-auction-system)
**Companies:** Google

---

## Problem Description

Design an auction system supporting creating auctions, placing bids, and ending auctions to determine winners.

---

## Approach

```
CLASS AuctionSystem:
    auctions = {}      // auctionId → {endTime, bids: MaxHeap}
    nextId = 1

    FUNCTION createAuction(endTime):
        auctions[nextId] = {endTime, bids: []}
        RETURN nextId++

    FUNCTION placeBid(auctionId, userId, amount):
        IF auction active: push (amount, userId) to bids heap

    FUNCTION endAuction(auctionId):
        RETURN winner = top of bids heap (highest amount, ties by earliest)
```

---

## Key Takeaway

> **Auction design: max-heap of bids per auction for O(log n) bid placement and O(1) winner retrieval. Track auction state (active/ended) with timestamps.**
