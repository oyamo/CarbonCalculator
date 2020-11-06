let hash = (string: string, max: Number) =>{
    let hash = 0;
    // Just telling our linter that this is a String
    if (typeof  string != 'string' || string.length === 0)
        return -1;
    for(let i = 0; i < string.length; i++){
        hash += string.charCodeAt(i);
    }
    return  hash % max;
}

class Hashtable {
    constructor() {
        this.storage = [];
        this.storageLimit = Number.MAX_VALUE;
        this.size = 0;
    }
    print(){
        console.log(this.storage);
    }

    /**
     * Adds a value into the hashmap
     * a hash is used as an index
     * so time complexity is O(1)
     * space complexity is O(n)
     */
    add(key: String, value){
        const index = hash(key, value);
        if(this.storage[index] !== undefined){
            this.storage[index] = [
                [key, value]
            ]
        }else{
            let inserted = false;
            for (let i = 0; i < this.storage[index].length; i++) {
                // If the key really exists
                if(this.storage[index][i][0] === key){
                    // Replace the value at that point
                    this.storage[index][i][1] = value;
                    inserted = true;
                }
            }
            if(!inserted){
                // Add a value into the bucket
                this.storage[index].push([key, value]);
            }
        }
        this.size ++;
    }
    remove(key){
        //Check if the key exists
        let index = hash(key, this.storageLimit);
        if(this.storage[index].length === 1 && this.storage[index][0][0] === key){
            this.size -= this.storage[index].length;
            delete this.storage[index];
            // Delete everything in that bucket
        }
    }
    lookup(){

    }

}