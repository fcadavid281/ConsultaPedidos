
import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const styleButton = {
    background: '#3298dc', color: 'white'
}

class Paginacion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemButtons: 3
        };
    }
    updatePage = page => () => {
        this.props.onSelect(page);
    };

    itemsDisplay = () => {
        let items = [];

        const currentPage = this.props.page;
        const total = this.props.totalElements;
        let totalPage = parseFloat(total / this.props.size);
        if ((totalPage % 1) > 0) {
            totalPage = parseInt(totalPage) + 1;
        }
        let start = currentPage - ((this.state.itemButtons - 1) / 2);
        start = start < 1 ? 1 : start;
        let end = start + this.state.itemButtons;
        if (start > 1) {
            items.push(
                <PaginationItem key={1}><PaginationLink style={styleButton} href="#" onClick={this.updatePage(1)} previous tag="button">Primera</PaginationLink></PaginationItem>
            );
        }
        while (start < end && start <= totalPage) {
            if (start === currentPage) {
                items.push(
                    <PaginationItem key={start} active><PaginationLink style={styleButton} href="#" onClick={this.updatePage(start)} tag="button">{start}</PaginationLink></PaginationItem>
                );
            } else {
                items.push(
                    <PaginationItem key={start} ><PaginationLink href="#" onClick={this.updatePage(start)} tag="button">{start}</PaginationLink></PaginationItem>
                );
            }
            start = start + 1;
        }
        if ((start - 1) < totalPage) {
            items.push(
                <PaginationItem key={totalPage}><PaginationLink style={styleButton} href="#" onClick={this.updatePage(totalPage)} next tag="button">Última</PaginationLink></PaginationItem>
            );
        }
        return items;
    };

    render() {
        let items = this.itemsDisplay();
        return (
            <nav>
                <Pagination>
                    {items}
                </Pagination>
            </nav>
        );
    }
}

export {
    Paginacion
};
