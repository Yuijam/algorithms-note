import { Edge } from "./edge";
import { MinPQ } from "./MinPQ";

class LazyPrimMST {
    private marked: boolean[];
    private mst: Edge[];
    private pq: MinPQ
}