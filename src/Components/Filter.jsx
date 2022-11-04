import { useState } from "react";
import { Link } from 'react-router-dom'
import PageNav from "./PageNav";

const Filter = ({sort='created_at', order='DESC', topic='all', p, noOfPages}) => {

    const [sortBy, setSortBy] = useState(sort)
    const [orderBy, setOrderBy] = useState(order)

	const handleSortChange = (input) => {
        setSortBy(input)
	};

    const handleOrderChange = (input) => {
        setOrderBy(input)
	};

	return (
		<form className="filter flex-col">
			<p>Displaying: {topic}</p>
			<fieldset className="flex-row">
				<label htmlFor="sortFilter">
					Sort By
					<select
						id="sortFilter"
						type="dropdown"
						onChange={(event) => {
							handleSortChange(event.target.value);
						}}
                        defaultValue={sortBy}
					>
						<option value="created_at">Date</option>
						<option value="votes">Votes</option>
						<option value="comment_count">Comments</option>
                        <option value="author">Author</option>
					</select>
				</label>
				<label htmlFor="orderFilter">
					Order
					<select
						id="orderFilter"
						type="dropdown"
						onChange={(event) => {
							handleOrderChange(event.target.value);
						}}
                        defaultValue={orderBy}
					>
						<option value="ASC">Ascending</option>
						<option value="DESC">Descending</option>
					</select>
				</label>
				<PageNav topic={topic} p={p} sort={sort} order={order} noOfPages={noOfPages}/>
                <Link className="load-button" to={`/${topic}?sort_by=${sortBy}&order=${orderBy}`}>Sort</Link>
			</fieldset>
		</form>
	);
};

export default Filter;
