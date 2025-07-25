var intervalId = null;
var shippingContainer = $("#shipping-preview-container").prependTo( 
  ".full-cart .summary-template-holder .summary-totalizers"
);
var moveShipping = function () {
  if ($("#shipping-preview-container").length) {
    $("#shipping-preview-container").prependTo(
      ".full-cart .summary-template-holder "
    );
    clearInterval(intervalId);
  }
  if ($(".srp-content.onda-v1").length) {
    $(".srp-content.onda-v1").after('<div class="firstChange"> <div class="firstChangeRow"><p class="firstChangetext1">Primeira troca é gratuita.</p> <p class="firstChangetext2"> A gente cuida disso pra você!</p></div></div>');
  }

  if ($(".btn-place-order-wrapper").length && $(".continueBuyingWrapper1").length === 0) {
    $(".btn-place-order-wrapper").after(`
    <div class="continueBuyingWrapper1">
      <a href="/" class="continueBuyingBtn">Continuar comprando</a>
    </div>
  `);
  }
  setTimeout(function () {
    if ($(".summary-template-holder .cart-links-bottom").length && $(".whatsapp-support-box").length === 0) {
      $(`
      <div class="whatsapp-support-box" style="border: 1px solid #ddd; padding: 16px; margin-top: 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 36px; border: 2px solid black; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
            ?
          </div>
          <div>
            <p style="font-weight: bold; margin: 0;">Ficou com alguma dúvida sobre o produto?</p>
            <p style="margin: 0;">Fale com a gente agora mesmo<br>pelo WhatsApp (11) 98951-7198</p>
          </div>
        </div>
        <a href="https://wa.me/5511989517198" target="_blank" style="display: block; background-color: #333; color: white; text-align: center; padding: 16px; margin-top: 16px; font-weight: bold; text-decoration: none;">
          <img src="https://eurico.vtexassets.com/assets/vtex.file-manager-graphql/images/5b6da489-143b-4e28-9dc3-6f0bc04fa669___6786a9432873aca3445e1192a5f7bd7a.png" alt="WhatsApp" style="width: 20px; vertical-align: middle; margin-right: 8px;">
          Tirar dúvida no WhatsApp
        </a>
      </div>
    `).insertAfter(".summary-template-holder .cart-links-bottom");
    }
  }, 2000);


};
const observer = new MutationObserver(() => {
  const target = document.querySelector(".vtex-omnishipping-1-x-addressFormPart1");
  if (target && !document.querySelector(".firstChange.address")) {
    target.insertAdjacentHTML("afterend", `
      <div class="firstChange address">
        <div class="firstChangeRow">
          <p class="firstChangetext1">Primeira troca é gratuita.</p>
          <p class="firstChangetext2">A gente cuida disso pra você!</p>
        </div>
      </div>
    `);
    observer.disconnect(); // Para de observar
  }
});

observer.observe(document.body, { childList: true, subtree: true });

const intervalPaymentSubmit = setInterval(() => {
  const $container = $('.payment-submit-wrap');

  if ($container.length && $('.continueBuyingWrapper2').length === 0) {
    $container.append(`
      <div class="continueBuyingWrapper2" style="margin-top: 16px;">
        <button class="continueBuyingBtn">Continuar comprando</button>
      </div>
    `);
    clearInterval(intervalPaymentSubmit);
  }
}, 500);




var clickOnCepBtn = function () {
  if ($("button#shipping-calculate-link").length) {
    $("button#shipping-calculate-link").trigger("click");
    clearInterval(intervalClickDelivery);
  }
  setTimeout(function () {
    clearInterval(intervalClickDelivery);
  }, 8000);
};

function barraFrete() {
  const valueFrete = 24900;
  const totalValue = Number(window.vtexjs.checkout.orderForm?.value);
  const valorFrete = Number(valueFrete);
  const calculateBar = ((totalValue / valorFrete) * 100).toFixed(2);
  const dynamicWidth = calculateBar + "%";
  const realValor = ((valorFrete - totalValue) / 100).toFixed(2);
  const RealNovo = realValor.split(".");

  let fretetexto = "";
  if (totalValue < valorFrete) {
    fretetexto = `<div>Faltam só <strong>${RealNovo[0]},${RealNovo[1]}</strong> para o <strong>Frete Grátis</strong>.</div> <br> <span>*Válido para metais com entrega no Sul e Sudeste </span>`;
  } else {
    fretetexto =
      "<strong>Você conquistou o frete grátis!</strong> <span>*Válido para metais com entrega no Sul e Sudeste </span>";
  }

  // HTML da barra de frete grátis
  const freeShippingHTML = `
<div id="freeShippingItem" class="freeShippingItem">
  <div id="fretetexto" class="title">${fretetexto}</div>
  <div class="freeShippingBar">
    <div id="freeShippingRange" class="freeShippingRange" style="width: ${dynamicWidth};"></div>
  </div>
</div>
`;

  const cartItemsDiv = document.querySelector(".table.cart-items");
  cartItemsDiv.insertAdjacentHTML("beforebegin", freeShippingHTML);
}

$(document).ready(function () {
  intervalId = setInterval(moveShipping, 500);
  intervalClickDelivery = setInterval(clickOnCepBtn, 500);
});


window.onload = function () {
  // barraFrete();
};

$(document).ready(function () {
  console.log("teste");

  const freteInfo = `
    <div class="info-frete">
        <img src="https://revest.vtexassets.com/assets/vtex.file-manager-graphql/images/e608aa4f-eb34-4dd3-b632-fa1d10cc3e53___849e6b2451dcd13032d2318929db5001.png" class="polygon"</img>
        <div>
            <img src="https://revest.vtexassets.com/assets/vtex.file-manager-graphql/images/3d2d634b-b22c-4419-8e4e-04ffbe27c188___37fc9b48acacb13cf9db15c5cb4e4929.png" 
                style="height: 20px; margin-bottom: -63px; width: 23px; margin-left: -28px;" />
            <div class="infos">
                <p style="margin: 8px 0; font-size: 11px; margin-left: 5px;">
                <b>As informações de frete e prazo de entrega deste produto <br class="mobile-break">são disponibilizadas pelo nosso</b>
                <a href="https://api.whatsapp.com/send/?phone=554491462600&text=Ol%C3%A1%2C+vim+do+e-commerce+e+preciso+de+ajuda&type=phone_number&app_absent=0" target="_blank" class="whatsapp-link"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="imagem-Whatsapp">
                    <g clip-path="url(#clip0_391_34)">
                    <path d="M5 6.5C5 5.96957 5.21071 5.46086 5.58579 5.08579C5.96086 4.71071 6.46957 4.5 7 4.5L8 6.5L7.23 7.65438C7.53544 8.38421 8.11579 8.96456 8.84562 9.27L10 8.5L12 9.5C12 10.0304 11.7893 10.5391 11.4142 10.9142C11.0391 11.2893 10.5304 11.5 10 11.5C8.67392 11.5 7.40215 10.9732 6.46447 10.0355C5.52678 9.09785 5 7.82608 5 6.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.49564 13.1945C6.75597 13.9239 8.23856 14.1701 9.667 13.8871C11.0954 13.6042 12.3722 12.8114 13.2593 11.6566C14.1464 10.5017 14.5832 9.06374 14.4884 7.61063C14.3935 6.15753 13.7734 4.78852 12.7438 3.75883C11.7141 2.72915 10.3451 2.10907 8.89196 2.01422C7.43886 1.91936 6.00085 2.3562 4.84604 3.24328C3.69123 4.13037 2.89844 5.40715 2.61548 6.83559C2.33252 8.26403 2.57871 9.74662 3.30814 11.007L2.52626 13.3413C2.49688 13.4294 2.49262 13.524 2.51395 13.6144C2.53528 13.7047 2.58136 13.7874 2.64703 13.8531C2.71269 13.9187 2.79535 13.9648 2.88574 13.9861C2.97612 14.0075 3.07066 14.0032 3.15876 13.9738L5.49564 13.1945Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_391_34">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>
                canal de Whatsapp</a>
                </p>
                <p style="margin: 0; font-size: 12px; margin-top: 9px;">
                Entre em contato para sua cotação personalizada!
                </p>
            </div>    
        </div>    
    </div>
    `;

  const cartContainer = document.querySelector(".table.cart-items");
  if (window.location.href.indexOf("?teste") >= 0 && cartContainer) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = freteInfo;
    cartContainer.appendChild(tempDiv.firstElementChild);
    console.log("[Frete Info] Mensagem inserida no carrinho com sucesso.");
  }
});

$(window).on("orderFormUpdated.vtex", function () {
  setTimeout(function () {
    var altura = $('.orderform-template-holder #shipping-data').height();
    if (altura) {
      $('.checkout-container .orderform-template .row-fluid #payment-data').css('margin-top', altura + 80 + 'px');
    }
  }, 100);
});

var ajusteTamanho = function () {

  if (window.innerWidth <= 900) return;

  if (!$('.orderform-template-holder #shipping-data').length) return;

  var altura = $('.orderform-template-holder #shipping-data').height();

  if (altura) {
    $('.checkout-container .orderform-template .row-fluid #payment-data').css('margin-top', altura + 80 + 'px');
  }
}



const Checkout = {
  init: function () {
    // coleção compre junto
    fetch('/api/catalog_system/pub/products/search?fq=H:379')
      .then(response => response.json())
      .then(data => {
        console.log("data ", data);

        const itemsHTML = data.map(product => {
          const price = product.items[0].sellers[0].commertialOffer.ListPrice;

          const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(price);

          return `
    <div class="buyTogether">
      <div class="buyTogetherWraper">
        <div class="buyTogetherImg">
          <img src="${product.items[0].images[0].imageUrl}" alt="${product.productName}"> 
        </div>
        <div class="buyTogetherName">${product.productName}</div>
        <div class="buyTogetherPrice">${priceFormatted}</div>
        <div class="buyTogetherBtn">
          <button class="buyTogetherAdd" data-sku="${product.items[0].itemId}">
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  `;
        }).join("");


        const fullHTML = `
       <div class="buyTogether">
        <p class="buyTogetherTitle">COMPRE TAMBÉM<p>
        ${itemsHTML}
        </div>
        `
        $(".table.cart-items").append(fullHTML);
      });
  }
};

$(document).ready(function () {
  setTimeout(function () {
    Checkout.init();
  }, 7000);

  $(document).on('click', '.buyTogetherAdd', function () {
    const skuId = $(this).data('sku');
    vtexjs.checkout.addToCart([{ id: skuId, quantity: 1, seller: '1' }]);
  });
});

// incluir placeholders 
var interval = setInterval(function () {
  var input = document.getElementById("client-first-name");
  if (input) {
    input.placeholder = "SEU PRIMEIRO NOME";
    clearInterval(interval);
  }
}, 300);
var intervalLN = setInterval(function () {
  var inputLN = document.getElementById("client-last-name");
  if (inputLN) {
    inputLN.placeholder = "SEU SOBRENOME";
    clearInterval(intervalLN);
  }
}, 300);
var intervalEmail = setInterval(function () {
  var inputEmail = document.getElementById("client-email");
  if (inputEmail) {
    inputEmail.placeholder = "SEU EMAIL";
    clearInterval(intervalEmail);
  }
}, 300);



// .table.cart-items.v-loaded {
//   background-color: red;

// }

//   fetch("https://eurico.myvtex.com/api/catalog_system/pub/products/search?fq=H:379&_from=0&_to=9")
//     .then(response => response.json())
//     .then(data => {
//       console.log("Produtos da coleção:", data);

//       // Exemplo: renderizar os nomes dos produtos
//       const container = document.getElementById("produtos");
//       data.forEach(prod => {
//         const div = document.createElement("div");
//         div.innerText = prod.productName;
//         container.appendChild(div);
//       });
//     })
//     .catch(err => console.error("Erro ao buscar coleção:", err));


// <div id="produtos"></div>
