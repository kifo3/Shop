export default function BasketItem(props) {
    const {id, name, price, quantity, incrementQuantity, decrementQuantity} = props;

    return(
        <li className="collection-item"> 
            {name} x{quantity} = {price}<b>$</b>
            <span className="secondary-content"> 
                <i class="material-icons left plus" onClick={() => incrementQuantity(id)}>exposure_plus_1</i>
                <i class="material-icons left plus" onClick={() => decrementQuantity(id)}>exposure_neg_1</i>
                <i className="material-icons basket-delete"
                    onClick={() => props.removeBasket(id)}
                >delete_forever</i>
            </span>
        </li>
    )
}